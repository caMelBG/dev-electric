import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { StoreModule } from './store/store.module';
import { ServicesModule } from './services/services.module';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorage } from 'angularfire2/storage';
import { FilterPipe } from './store/filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
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
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule,
    ServicesModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    FilterPipe,
    AngularFireStorage,
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
