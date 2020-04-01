import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { CounterDirective } from './counter.directive';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StoreComponent } from './store.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FilterPipe } from './filter.pipe';
import { OrdersComponent } from './orders/orders.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CounterDirective,
    FilterPipe,
    CategoriesComponent,
    ProductsComponent,
    ProductDetailsComponent,
    StoreComponent,
    CheckoutComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    DropZoneDirective,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
