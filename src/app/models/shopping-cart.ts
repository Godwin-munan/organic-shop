import { ItemMap } from "./item-map";
import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: ItemMap){

    this.itemsMap = this.itemsMap || {};

    for(let productId in itemsMap){
      let item = itemsMap[productId];
      
      this.items.push(new ShoppingCartItem({...item, id: productId}));
    }
      
  }


  getQuantity(product: Product){
    let item = this.itemsMap[product.id];
    return item ? item?.quantity : 0
  }

  get totalItemsCount(){

    let count = 0;
      for(let productId in this.itemsMap)
        count += this.itemsMap[productId].quantity;
    return count;
  }

  get totalPrice(){
    let sum = 0;
    for(let productId in this.items)
      sum += this.items[productId].totalPrice

    return sum;
  }

}