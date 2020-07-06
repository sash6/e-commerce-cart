import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  cartItems:any=[]
  itemsCount:any;
  totalPrice:any;
  constructor() { 
    this.cartItems =JSON.parse(localStorage.getItem('cartItems'))
    this.itemsCount = JSON.parse(localStorage.getItem('totalCartItems'))
    console.log('cart items in cart:::', this.cartItems)
    this.totalPrice =JSON.parse(localStorage.getItem('totalPrice'))
  }

  ngOnInit() {
  }

  async removeItemFromCart(index,id) {    
    this.cartItems = await this.cartItems.filter(item => item.id != id)
    console.log('removed method....cart items::::', this.cartItems)
    this.updateCartItemsInLocalStorage(id,'sub')
  }

  updateCartItemsInLocalStorage(id, op) {
    localStorage.setItem('cartItems',JSON.stringify(this.cartItems));
    localStorage.setItem('totalPrice', this.totalPrice);
    localStorage.setItem('totalCartItems', this.itemsCount)    
    console.log('local storage values:::',JSON.parse(localStorage.getItem('cartItems')))
  }

  itemIncrease(item, index) {
    this.cartItems[index].qty += 1; 
    this.totalPrice+=item.price
    this.itemsCount+=1
    this.updateCartItemsInLocalStorage(item.id,'add')    
  }

  itemDecrease(item, index) {    
    if (this.cartItems[index].qty - 1 <= 0) {     
      this.cartItems[index].qty = 0;
      this.totalPrice-=item.price 
      this.removeItemFromCart(index, item.id);         
    }
    else {            
      this.totalPrice-=item.price 
      this.cartItems[index].qty -= 1;  
      this.itemsCount-=1    
      this.updateCartItemsInLocalStorage(item.id,'sub')
    }
  }


}
