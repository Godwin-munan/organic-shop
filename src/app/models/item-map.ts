import { ShoppingCartItem } from "./shopping-cart-item";

export interface ItemMap{
  [productId: string]: ShoppingCartItem;
}