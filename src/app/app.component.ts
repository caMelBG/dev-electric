import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dev-electric';
  editing: boolean = false;
  product: Product = new Product();

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public signOut(): void {
    this.authService.SignOut();
    this.router.navigate(['/products']);
  }

  public search(searchQuery: string): void {
    this.router.navigate(['/products', { categoryId: null, searchQuery: searchQuery }]);
  }
}
