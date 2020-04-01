import { OrderItem } from './orderItem.model';

export class Order {
    constructor(
        public id?: string,
        public fullName?: string,
        public email?: string,
        public phoneNumber?: string,
        public city?: string,
        public address?: string,
        public orderItems?: Array<OrderItem>,
        public status?: OrderStatus,
    ) {
        this.orderItems = [];
    }

    public get total(): number {
        let total = 0;
        this.orderItems.forEach(x => {
            total += (x.quantity * x.product.price);
        });
        return total;
    }
}

export enum OrderStatus {
    Pending = 1,
    Completed = 2,
}