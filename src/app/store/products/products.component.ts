import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public pages: number;
  public pageSize: number = 4;
  public selectedPage: number;
  public products: Product[];
  public categoryId: string = null;
  public searchQuery: string = null;
  public categoryName: string = null;

  constructor(
    public filterPipe: FilterPipe,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      this.searchQuery = params.get('searchQuery');
      if (this.categoryId != null && this.categoryId != 'null') {
        this.categoryService.getCategory(this.categoryId).subscribe(x => { this.categoryName = x.name; });
      } else if (this.searchQuery) {
        this.categoryName = this.searchQuery;
      } else {
        this.categoryName = 'Products';
      }

      this.productService.getProducts(this.categoryId)
        .subscribe(x => {
          this.products = x;
          if (this.categoryId != null && this.categoryId != 'null') {
            this.products = this.products.filter(x => x.categoryId == this.categoryId);
          }

          if (this.searchQuery) {
            this.products = this.products.filter(x => x.name.indexOf(this.searchQuery) >= 0);
          }

          this.pages = Math.ceil(this.products.length / this.pageSize);
          this.products = this.products.slice(0, this.pageSize);
        });
    });
  }

  public changePage(page: number): void {
    this.selectedPage = page;
    let pageIndex = (this.selectedPage - 1) * this.pageSize;
    this.productService.getProducts(this.categoryId)
      .subscribe(x => {
        this.products = x;
        if (this.categoryId != null && this.categoryId != 'null') {
          this.products = this.products.filter(x => x.categoryId == this.categoryId);
        }

        if (this.searchQuery) {
          this.products = this.products.filter(x => x.name.indexOf(this.searchQuery) >= 0);
        }

        this.pages = Math.ceil(this.products.length / this.pageSize);
        this.products = this.products.slice(pageIndex, pageIndex + this.pageSize);
      });
  }
}
