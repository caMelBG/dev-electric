import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './store/auth/login/login.component';
import { SignupComponent } from './store/auth/signup/signup.component';
import { OrdersComponent } from './store/orders/orders.component';
import { ProductsComponent } from './store/products/products.component';
import { ProductDetailsComponent } from './store/product-details/product-details.component';
import { CartComponent } from './store/cart/cart.component';
import { CheckoutComponent } from './store/checkout/checkout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'orders', component: OrdersComponent },
  { path: "products", component: ProductsComponent },
  { path: "products/:categoryId/:searchQuery", component: ProductsComponent },
  { path: "products/:categoryId", component: ProductsComponent },
  { path: "product", component: ProductDetailsComponent },
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "cart/:productId", component: CartComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "**", redirectTo: "/products" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
  ]
})
export class AppRoutingModule { }
