import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection: AngularFirestoreCollection<Category>;
  private categoryDocument: AngularFirestoreDocument;
  private categories: Observable<Category[]>;

  constructor(
    private angularForestore: AngularFirestore
  ) {
    this.categoryCollection = this.angularForestore.collection<Category>('categories');
    this.initCategories();
  }

  public getCategory(id: string): Observable<Category> {
    return this.categories.map(x => x.find(y => y.id == id));
  }

  public getCategories(): Observable<Category[]> {
    return this.categories;
  }

  public addCategory(category: Category): void {
    this.categoryCollection.add({ ...category })
  }

  public updateCategory(category: Category): void {
    let categoryId = category.id;
    this.categoryDocument = this.angularForestore.doc(`categories/${{ categoryId }}`);
    if (category.name == '') {
      this.categoryDocument.delete();
    } else {
      this.categoryDocument.update(category);
    }
  }

  private initCategories(): void {
    this.categories = this.categoryCollection
      .snapshotChanges()
      .map(changes => {
        return changes.map(y => {
          const data = y.payload.doc.data() as Category;
          data.id = y.payload.doc.id;
          return data;
        })
      });
  }
}
