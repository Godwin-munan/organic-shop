import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { ItemMap } from './models/item-map';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { 
  }


  async getCart() : Promise<Observable<ShoppingCart>>{
    let cardId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cardId+'/items').valueChanges().pipe(
      map( x => {
       let i =  x as ItemMap
      //  console.log(JSON.stringify(x))
       return  new ShoppingCart(i)
      })
    );
  }

  async addToCart(product: Product){
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1)
  }


  async clearCart(){
    let cartId =  await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create(){ 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(){

    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key as string);
    return result.key as string;
    
  }

 
  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let url = `/shopping-carts/${cartId}/items/${product.id}`;
    let item$ = await this.db.object(url);
    

    firebase.default.database().ref(url).get().then(result => {
      
        let num = result.child(`quantity`).val() as number;
        let quantity = (num || 0) + change;
      
        if(quantity === 0) item$.remove()
        else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        })
    })
  }


}
