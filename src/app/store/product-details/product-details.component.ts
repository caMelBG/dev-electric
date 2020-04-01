import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product = new Product();
  public productName: string;
  public productDescription: string;
  public productCategoryId: string;
  public productImage: string;
  public productPrice: number;

  public categories: Category[];
  public isLoggedIn: boolean;
  public percentage: Observable<number>;
  private file: any;
  private task: AngularFireUploadTask;

  constructor(
    private router: Router,
    public authService: AuthService,
    private storage: AngularFireStorage,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.categoryService.getCategories().subscribe(x => { this.categories = x; });

    this.activatedroute.paramMap.subscribe(params => {
      let productId: string = params.get('id');
      if (productId != null) {
        this.productService.getProduct(productId).subscribe(x => {
          this.product = x;

          this.productName = x.name;
          this.productDescription = x.description;
          this.productCategoryId = x.categoryId;
          this.productImage = x.image;
          this.productPrice = x.price;
        });
      }
    });
  }

  public onFileSelected(event): void {
    this.file = event.target.files[0];
    const path = `images/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.product.image = url;
        });
      })
    ).subscribe();
  }

  public changeProductName(event: any): void {
    this.product.name = event.target.value.trim();
  }

  public changeProductDescription(event: any): void {
    this.product.description = event.target.value.trim();
  }

  public changeProductPrice(event: any): void {
    this.product.price = <number>event.target.value.trim();
  }

  public changeCategory(categoryId: string): void {
    this.product.categoryId = categoryId;
  }

  public saveDetails(): void {
    debugger
    this.productName
    if (this.product.id == undefined) {
      this.productService.addProduct(this.product);
    } else {
      this.productService.updateProduct(this.product);
    }

    this.router.navigate(['/products']);
  }
}
