import { Component, OnInit } from '@angular/core';
import jsonData from '../../data.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public itemsList:{title:string}[] = jsonData;
  constructor() { 
    console.log('home page')
  }

  ngOnInit() {
  }

}
