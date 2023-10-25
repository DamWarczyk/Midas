import { Component, OnInit } from '@angular/core';
import {NgStyle} from "@angular/common";
import {HttpServiceService} from "../servis/http-service.service";
import {Item} from "../interface/item";
import {Router} from "@angular/router";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css']
})
export class MainPage implements OnInit {

  constructor(private httpService: HttpServiceService, private router: Router) { }

  public listItems: Item[] = [];

  ngOnInit(): void {
    this.getItem()
  }

  getItem(){
    this.httpService.getItems().subscribe(
      (data: Item []) =>{ this.listItems = data}
    )
  }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  photo = '../../assets/images/goldering2.jpg';


  routerToItemPage() {
    this.router.navigate(['/oferta'])
  }
}

