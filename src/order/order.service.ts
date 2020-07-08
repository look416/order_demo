import { Injectable, Inject } from '@nestjs/common';
// import { Order } from './interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.create.dto';
import { DateTime } from 'luxon';
import { generate } from 'shortid';
import axios from 'axios';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  async create(order: CreateOrderDto): Promise<Order> {
    order.id = generate();
    order.status = 'Created';
    order.createdAt = DateTime.local().toSQL();
    order.updatedAt = DateTime.local().toSQL();
    order.waived = false;

    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async payment(order: Order, authorization: String): Promise<Order> {
    try {
      const params = {
        userId: order.userId,
        orderId: order.id,
        merchantId: order.merchantId,
        outletId: order.outletId,
        total: order.total,
        discount: order.discount,
      };
      const payment = await this.paymentClient
        .send('payment', params)
        .toPromise();
      /* No longer needed as we move to nestjs/microservices
      const { data: payment } = await axios.post(
        `${process.env.payment_url}/payments`,
        {
          userId: order.userId,
          orderId: order.id,
          merchantId: order.merchantId,
          outletId: order.outletId,
          total: order.total,
          discount: order.discount,
        },
        {
          headers: {
            Authorization: authorization,
          },
        },
      ); */
      return this.orderModel
        .findOneAndUpdate(
          {
            id: order.id,
          },
          {
            status: payment.status ? 'Confirmed' : 'Cancelled',
          },
          { new: true },
        )
        .exec();
    } catch (err) {
      console.error(err.message);
      return this.orderModel
        .findOneAndUpdate(
          {
            id: order.id,
          },
          {
            status: 'Cancelled',
          },
          { new: true, useFindAndModify: false },
        )
        .exec();
    }
  }

  async cancel(id: String): Promise<Order> {
    const order = await this.orderModel.findOne({
      id,
    });
    if (!order) {
      throw new Error('Order not found');
    }
    return this.orderModel
      .findOneAndUpdate(
        {
          id: id,
        },
        {
          status: 'Cancelled',
        },
        { new: true, useFindAndModify: false },
      )
      .exec();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async find(id: String): Promise<Order> {
    return this.orderModel.findOne({
      id,
    });
  }

  @Cron('0 */3 * * * *')
  async handleConfirmedOrder() {
    this.orderModel.updateMany(
      { status: 'Confirmed' },
      { status: 'Delivered' },
    ).exec();
  }
}
