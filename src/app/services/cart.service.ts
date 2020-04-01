import { Injectable } from '@angular/core';
import { OrderItem } from '../models/orderItem.model';
import { Order, OrderStatus } from '../models/order.model';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private currentOrder: Order = new Order();

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private orderItemService: OrderItemService) {
  }

  public getCurrentOrder(): Order {
    return this.currentOrder;
  }

  public addProductToCart(productId: string): void {

    if (productId == 'undefined' || productId == null) {
      return;
    }

    let orderItem = this.currentOrder.orderItems.filter(x => x.productId == productId).pop();
    if (orderItem != null) {
      orderItem.quantity++;
      return;
    }

    orderItem = new OrderItem(null, productId, 1);
    this.productService.getProduct(productId).subscribe(x => { orderItem.product = x; })
    this.currentOrder.orderItems.push(orderItem);
  }

  public removeProduct(productId: string): void {
    this.currentOrder.orderItems = this.currentOrder.orderItems.filter(x => x.productId != productId);
  }

  public changeQuantity(productId: string, newValue: number): void {
    let orderItem = this.currentOrder.orderItems.find(x => x.productId == productId);
    if (orderItem.quantity + newValue < 0) {
      return;
    }

    orderItem.quantity += newValue;
  }

  public checkout(order: Order): void {

    this.currentOrder.fullName = order.fullName;
    this.currentOrder.email = order.email;
    this.currentOrder.city = order.city;
    this.currentOrder.email = order.email;
    this.currentOrder.phoneNumber = order.phoneNumber;
    this.currentOrder.status = OrderStatus.Completed;

    this.currentOrder.orderItems.forEach(x => {
      this.orderItemService.addOrderItem(x);
    });

    this.orderService.addOrder(this.currentOrder);
    this.currentOrder = new Order();
  }
}
