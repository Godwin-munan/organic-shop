import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Category } from './models/category-list';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() : Observable<Category> {
    return this.db.list('/categories',
     ref => ref.orderByChild('name'))
      .valueChanges() as unknown as Observable<Category>
  }
}
