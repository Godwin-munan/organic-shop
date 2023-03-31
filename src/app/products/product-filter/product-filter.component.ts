import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/models/category-list';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
categories: Category[] = [];
subscription!: Subscription;
@Input('category')category: any;

constructor(categoryService: CategoryService){

  categoryService.getAll().subscribe(category => this.categories = category as unknown as Category[])
}

// ngOnDestroy(): void {
//   this.subscription.unsubscribe()
// }

}
