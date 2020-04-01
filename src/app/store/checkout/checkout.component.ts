import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public order: Order;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.order = this.cartService.getCurrentOrder();
  }

  onSubmit() {
    this.cartService.checkout(this.order);
  }
}
