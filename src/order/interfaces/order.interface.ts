import { OrderItem } from "./orderItem.interface";

export interface Order {
    id: String
    status: String
    userId: String
    orderedAt: String
    merchantId: String
    outletId: String
    createdAt: String
    updatedAt: String
    deletedAt: String
    total: Number
    discount: Number
    waived: Boolean
    orderItems: [OrderItem]
}
