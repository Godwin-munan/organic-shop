import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, OnInit{
  products: Product[] = [];
  filteredProducts!: any[]
  subscription!: Subscription;

  //DataTable
  rows: Product[] = [];
  ColumnMode = ColumnMode;
  


  constructor(private productService: ProductService){
    this.subscription = this.productService.getAll().subscribe(products => {

      this.rows  = this.filteredProducts = this.products = products as Product[]
    }
      
      );
    
  }
  

  ngOnInit(): void {
    
  }
  

  filter(query: string){
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) ) : this.products;
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
