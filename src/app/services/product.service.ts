import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection: AngularFirestoreCollection<Product>;
  private productDocument: AngularFirestoreDocument;
  private products: Observable<Product[]>;

  constructor(
    private angularForestore: AngularFirestore
  ) {
    this.productCollection = this.angularForestore.collection<Product>('products');
    this.products = this.productCollection
      .snapshotChanges()
      .map(changes => {
        return changes.map(y => {
          const data = y.payload.doc.data() as Product;
          data.id = y.payload.doc.id;
          return data;
        })
      });
  }

  public getProduct(id: string): Observable<Product> {
    return this.products.map(x => x.find(y => y.id == id));
  }

  public getProducts(categoryId: string): Observable<Product[]> {
    return this.products;
  }

  public addProduct(product: Product): void {
    this.productCollection.add({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      categoryId: product.categoryId,
    });
  }

  public updateProduct(product: Product): void {
    let productId = product.id;
    let name = 'products/' + productId;
    this.productDocument = this.angularForestore.doc(name);
    this.productDocument.update({ ...product });
  }

  public deleteProduct(id: string): void {
    let name = 'products/' + id;
    this.productDocument = this.angularForestore.doc(name);
    this.productDocument.delete();
  }
}
