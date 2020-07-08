import { Controller, Get, Req, Post, Param, Body, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateOrderDto } from './dto/order.create.dto';
import { OrderService } from './order.service';
// import { Order } from './interfaces/order.interface';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { Order } from './schema/order.schema';
import { User } from 'src/users/users.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request: Request): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id): Promise<Order> {
    return this.orderService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body:CreateOrderDto, @Req() req: Request): Promise<Order> {
    let user:User = req.user
    body.userId = user.userId
    const order = await this.orderService.create(body);
    return this.orderService.payment(order, req.headers.authorization)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async cancel(@Param('id') id, @Req() req: Request): Promise<Order> {
    return this.orderService.cancel(id);
  }
}
