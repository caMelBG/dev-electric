import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public order: Order;

  constructor(
    private orderService: CartService,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      let productId: string = params.get('productId');
      this.orderService.addProductToCart(productId);
    });
    this.order = this.orderService.getCurrentOrder();
  }

  public increaseQuantity(productId: string): void {
    this.orderService.changeQuantity(productId, 1);
  }

  public decreaseQuantity(productId: string): void {
    this.orderService.changeQuantity(productId, -1);
  }

  public removeProduct(productId: string): void {
    this.orderService.removeProduct(productId);
  }
}
