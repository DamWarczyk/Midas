import { Component, OnInit } from '@angular/core';
import {NgStyle} from "@angular/common";
import {HttpServiceService} from "../servis/http-service.service";
import {Item} from "../interface/item";


@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent implements OnInit {

  constructor(private httpService: HttpServiceService) { }

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


}

