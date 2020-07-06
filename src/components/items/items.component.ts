import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() items: any;
  itemsCount:any = 0;
  cartItems: any = [];
  totalPrice: any=0;
  totalCartItems: any=0;
  constructor(private router: Router) { 
    console.log('items constructor calling.......')
    // localStorage.clear();
    var prevItems = JSON.parse(localStorage.getItem('cartItems'))
    // console.log('prev items:::', prevItems)
    var prevTotPrice = JSON.parse(localStorage.getItem('totalPrice'))
    var prevCartItems = JSON.parse(localStorage.getItem('totalCartItems'))
    // console.log('prevCartItems:::', prevCartItems)
    if(prevItems){
      this.cartItems = prevItems      
    }
    if(prevTotPrice)    
      this.totalPrice = prevTotPrice
    if(prevCartItems)
      this.itemsCount =prevCartItems
  }

  ngOnInit() {    
  }

  updateLocalStorage() {    
    localStorage.setItem('cartItems',JSON.stringify(this.cartItems));
    localStorage.setItem('totalPrice', this.totalPrice);
    localStorage.setItem('totalCartItems', this.itemsCount);
    // this.cartItems.map(item =>{
    //   if(item.id == id)
    //     if(op == 'add')
    //       item.qty+=1
    //     else
    //       item.qty-=1
    // })
  }

  onCartClick() {
    // console.log('cart items::::', this.cartItems)  
    this.cartItems.map(item => {
      this.totalPrice+=item.qty*item.price;
    })    
    this.updateLocalStorage()
    this.router.navigateByUrl('/cart-items');   
  }
  
  async addItemToCart(index,id) {
    var isPresent = this.cartItems.some(function(el){ return el.id === id});
    if(isPresent){      
      this.cartItems = await this.cartItems.filter(item => item.id != id)      
      this.cartItems.push(this.items[index]);
    }
    else
      this.cartItems.push(this.items[index]);
    
      // this.updateLocalStorage(id)
  }

  async removeItemFromCart(index,id) {    
    this.cartItems = await this.cartItems.filter(item => item.id != id)
    console.log('removed method....cart items::::', this.cartItems)
    // this.updateLocalStorage()
  }

  itemIncrease(item, index) {
    this.items[index].qty += 1; 
    this.itemsCount+=1;
    this.addItemToCart(index, item.id);   
    // this.updateLocalStorage(item.id,'add')
  }

  itemDecrease(item, index) {    
    if (this.items[index].qty - 1 <= 0) {     
      this.items[index].qty = 0;
      this.removeItemFromCart(index, item.id);         
    }
    else {     
      this.items[index].qty -= 1;
      this.itemsCount-=1;
      this.addItemToCart(index, item.id);   
      // this.updateLocalStorage(item.id,'sub')     
    }    
  }

}
