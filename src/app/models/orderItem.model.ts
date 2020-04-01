import { Product } from './product.model';

export class OrderItem {
    constructor(
        public id?: string,
        public productId?: string,
        public quantity?: number,
        public orderId?: string,
        public product?: Product,
    ) { }
}