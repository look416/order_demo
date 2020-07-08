import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, Order } from './schema/order.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.REDIS,
        options: {
            url: process.env.redis_url,
            password: process.env.redis_secret
        }
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
