import { OrderItem } from '../interfaces/orderItem.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  id: String;
  status: String;
  userId: String;
  orderedAt: String;
  @IsNotEmpty()
  merchantId: String;
  @IsNotEmpty()
  outletId: String;
  createdAt: String;
  updatedAt: String;
  deletedAt: String;
  total: Number;
  discount: Number;
  waived: Boolean;
  orderItems: [OrderItem];
}
