import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;

  constructor(
    private angularForestore: AngularFirestore
  ) {
    this.orderCollection = this.angularForestore.collection<Order>('orders');
    this.orders = this.orderCollection
      .snapshotChanges()
      .map(changes => {
        return changes.map(y => {
          const data = y.payload.doc.data() as Order;
          data.id = y.payload.doc.id;
          return data;
        })
      });
  }

  public getOrder(id: string): Observable<Order> {
    return this.orders.map(x => x.find(y => y.id == id));
  }

  public getOrders(): Observable<Order[]> {
    return this.orders;
  }

  public addOrder(order: Order): void {
    this.orderCollection.add(order);
  }
}
