import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';

@NgModule({
  providers: [
    CartService,
    CategoryService,
    OrderService,
    OrderItemService,
    ProductService,
    AuthService
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class ServicesModule { }
