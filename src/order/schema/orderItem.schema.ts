import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OrderItem extends Document {
  @Prop()
  id: String;
  @Prop()
  name: String;
  @Prop()
  createdAt: String;
  @Prop()
  updatedAt: String;
  @Prop()
  amount: Number;
  @Prop()
  discount: Number;
  @Prop()
  quantity: Number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
