import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
products: Product[] = [];
filteredProducts: Product[] = [];
category!: string;
cart$!: Observable<ShoppingCart>;


constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  private catService: ShoppingCartService
  ){}
 
  async ngOnInit(){
    this.cart$ = await this.catService.getCart() as Observable<ShoppingCart>
  
    this.populateProducts();
  }

  private populateProducts(){
    this.productService.getAll()
    .pipe(
  
      switchMap(products => {
        this.filteredProducts = this.products = products as Product[];
  
        return this.route.queryParamMap
      })
    ).subscribe(params => {
      this.category = params.get('category') as string;    
      this.applyFilter();
    });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : this.products;
  }

}
