import { CartItem } from './../model/cart-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  CartItems : CartItem[] = [] ;

  totalPrice : Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity : Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;

  constructor() { 
    // read data from storage 
    let data = JSON.parse(this.storage.getItem('CartItems'));

    if(data != null){
      this.CartItems = data ;
      // compute tot based on the data that is read from storage 
      this.computeCartTotals();
    }
  }

  addToCart(theCartItem : CartItem){

    // check if we already have the item in our cart 

    let alreadyExistsInCart : boolean = false ;
    let existingCartItem : CartItem = undefined ;

    if(this.CartItems.length >0){
      // find the item in the cart based on item id 
      
      existingCartItem = this.CartItems.find(
        tempCartItem => tempCartItem.id === theCartItem.id
      );

        
      alreadyExistsInCart = (existingCartItem != undefined) ;
    }
    // check if we found it 

    

    if(alreadyExistsInCart){
      //increment the quantity

      existingCartItem.quantity ++ ;

    }else{
      // just add the item to the array 
      this.CartItems.push(theCartItem) ;
    }

    // compute cart total price and total quantity 

    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue : number = 0 ;
    let totalQuantityValue : number = 0 ;

    for(let currentCartItem of this.CartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice ;
      totalQuantityValue += currentCartItem.quantity ;

    }
    // publish the new values ... all subscribers will receive the new data 

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes

    this.logCartdata(totalPriceValue,totalQuantityValue);

    // persist cart data 
    this.persistCartItems();
    
  }

  persistCartItems(){
    this.storage.setItem('CartItems',JSON.stringify(this.CartItems));
  }


  
  logCartdata(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.CartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice ;
      console.log(`name : ${tempCartItem.name} , quantity:${tempCartItem.quantity},
      unitPrice:${tempCartItem.unitPrice} , subTotalPrice:${subTotalPrice}`)
    }

    console.log(`totalPrice : ${totalPriceValue.toFixed(2)},
                 totalQuantity : ${totalQuantityValue}`);
    console.log('-----------');
  }

  decrementQuantity(theCartItem: CartItem) {
      theCartItem.quantity -- ;
      if(theCartItem.quantity === 0){
        this.remove(theCartItem);
      }else{
        this.computeCartTotals();
      }
  }
  remove(theCartItem: CartItem) {
    
    // get index of item in the array 
    const itemIndex = this.CartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id) ;
    
    // if found , remove the item from the array at the given index 
    if (itemIndex > -1 ){
      this.CartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

}
