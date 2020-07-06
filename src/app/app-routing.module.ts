import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartItemsComponent } from '../components/cart-items/cart-items.component'
import { ItemsComponent } from '../components/items/items.component'
import { HomeComponent } from '../components/home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cart-items',
    component: CartItemsComponent
  },
  {
    path: 'items',
    component: ItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }