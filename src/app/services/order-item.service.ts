import { Injectable } from '@angular/core';
import { OrderItem } from '../models/orderItem.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private orderItemsCollection: AngularFirestoreCollection<OrderItem>;
  private orderItems: Observable<OrderItem[]>;

  constructor(
    private angularForestore: AngularFirestore
  ) {
    this.orderItemsCollection = this.angularForestore.collection<OrderItem>('orderItems');
    this.orderItems = this.orderItemsCollection
      .snapshotChanges()
      .map(changes => {
        return changes.map(y => {
          const data = y.payload.doc.data() as OrderItem;
          data.id = y.payload.doc.id;
          return data;
        })
      });
  }

  public getOrderItem(id: string): Observable<OrderItem> {
    return this.orderItems.map(x => x.find(y => y.id == id));
  }

  public getOrderItems(): Observable<OrderItem[]> {
    return this.orderItems;
  }

  public addOrderItem(order: OrderItem): void {
    this.orderItemsCollection.add(order);
  }
}
