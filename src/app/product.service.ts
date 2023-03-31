import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product:any){

    this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').valueChanges( [],{ idField: 'id'});
  }

  get(id:any){
    return this.db.object('/products/'+id).valueChanges();
  }

  update(productId:any, product:any){
    return this.db.object('/products/'+productId).update(product)
  }

  delete(productId:any){
    // let db = firebase.default.database();
    // let ref = db.ref('products/' + productId);
    // ref.remove();
    
    return  this.db.object('/products/'+productId).set(null);
  }

}
