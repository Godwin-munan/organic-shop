import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap, take } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/models/category-list';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy{
  categories$!: Observable<any>;
  id!: any;
  uri: URL = new URL('https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg');
  product: Product = {
    id: undefined,
    title: '',
    price: 0,
    category: '',
    imageUrl: ''
  };
  cart: any;
  subscription!: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private catService:  ShoppingCartService ){
   this.categories$ =  this.categoryService.getAll()

   this.id = this.route.snapshot.paramMap.get('id');
  
   if(this.id) this.productService.get(this.id)
  .pipe(take(1))
  .subscribe(p => {
    this.product = p as Product;
  })
}
  

async ngOnInit(){
  this.subscription = (await this.catService.getCart() as Observable<any>).subscribe(cart => {
    this.cart = cart
  });
}

ngOnDestroy(){
  this.subscription.unsubscribe();
}

save(product:any){
  if(this.id) this.productService.update(this.id, product);
  else this.productService.create(product);
  
  this.router.navigate(['/admin/products']);

}

delete(){
  if(!confirm('Are you sure you want to delete this product')) return

  this.productService.delete(this.id).then(()=> console.log('successful')).catch(error =>  console.log(error.message));
  this.router.navigate(['/admin/products']);
}





  


}
