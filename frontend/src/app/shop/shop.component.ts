import {Component, Inject, Input, OnInit} from '@angular/core';
import {Item} from "../interface/item";
import {HttpServiceService} from "../servis/http-service.service";
import {AuthService} from "../servis/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private httpService: HttpServiceService, public auth: AuthService, public dialog: MatDialog) {
  }

  public listItems: Item[] = [];
  public filter: string = "Recommended";

  hasRole(role: string): boolean {
    return this.auth.user?.roles.includes(role) || false;
  }

  ngOnInit(): void {
    this.getItem()
  }

  getItem() {
    this.httpService.getItems().subscribe(
      (data: Item []) => {
        this.listItems = data
      }
    )
  }

  openItemAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ItemAdd);
    this.dialog.afterAllClosed.subscribe( () => this.getItem())
  }

  deleteItem(item: Item) {
    this.httpService.deleteItem(item.id).subscribe(() => this.getItem());
  }

  updateItem(item: Item) {
    this.dialog.open(ItemUpdate, {data: item});
    this.dialog.afterAllClosed.subscribe( () => this.getItem())
  }

  buyItem(item: Item){
    this.dialog.open(ItemBuy, {data: item})
    this.dialog.afterAllClosed.subscribe( () => this.getItem())
  }

  filterItems(value:string){
    this.filter = value;
    console.log(this.filter)

    if (this.filter == "Price asc"){
      this.listItems.sort( (a, b) => {return a.cena - b.cena})
    }

    if (this.filter == "Price dec"){
      this.listItems.sort( (a, b) => {return b.cena - a.cena})
    }

    if (this.filter == "Recommended"){
      this.getItem()
    }
  }
}

@Component({
  selector: 'itemadd',
  templateUrl: './itemadd.html',
})
export class ItemAdd {
  myForm: FormGroup;
  item!: Item;

  constructor(public dialogRef: MatDialogRef<ItemAdd>, private fb: FormBuilder, private httpservice: HttpServiceService, private route: Router) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      cena: ['', [Validators.required, Validators.min(1)]],
      opis: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    })
  }

  onClick() {
    this.item = this.myForm.value;
    this.httpservice.addItem(this.item).subscribe(() => this.route.navigate(['/oferta']));
  }
}

@Component({
  selector: 'itemupdate',
  templateUrl: './itemupdate.html',
})
export class ItemUpdate {
  myForm: FormGroup;
  item: Item;

  constructor(public dialogRef: MatDialogRef<ItemUpdate>, private fb: FormBuilder, private httpservice: HttpServiceService,  @Inject(MAT_DIALOG_DATA) public data: Item, private route: Router) {
    this.myForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      cena: [this.data.cena, [Validators.required, Validators.min(1)]],
      opis: [this.data.opis, [Validators.required]],
      imageUrl: [this.data.imageUrl, [Validators.required]]
    })
    this.item = this.data;
  }

  onClick() {
    this.item.id = this.data.id;
    this.item = this.myForm.value;
    this.httpservice.updateItem(this.item, this.data.id).subscribe(() => this.route.navigate(['oferta']));
  }
}


@Component({
  selector: 'itembuy',
  templateUrl: './itembuy.html',
})
export class ItemBuy {

  constructor(public dialogRef: MatDialogRef<ItemBuy>, private httpservice: HttpServiceService,  @Inject(MAT_DIALOG_DATA) public data: Item, private route: Router) {
  }

  buyItem() {
    this.httpservice.buyItem(this.data.id).subscribe(() => this.route.navigate(['oferta']));
  }
}
