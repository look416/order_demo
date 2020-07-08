import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderItem } from '../interfaces/orderItem.interface';
import { OrderItemSchema } from './orderItem.schema';

@Schema()
export class Order extends Document {
  @Prop()
  id: String;
  @Prop()
  status: String;
  @Prop()
  userId: String;
  @Prop()
  orderedAt: String;
  @Prop()
  merchantId: String;
  @Prop()
  outletId: String;
  @Prop()
  createdAt: String;
  @Prop()
  updatedAt: String;
  @Prop()
  deletedAt: String;
  @Prop()
  total: Number;
  @Prop()
  discount: Number;
  @Prop()
  waived: Boolean;
  @Prop([OrderItemSchema])
  orderItems: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
