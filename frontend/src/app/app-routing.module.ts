import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPage} from "./main-page/main-page";
import {ShopComponent} from "./shop/shop.component";



const routes: Routes = [
  { path: '', redirectTo: '/strona', pathMatch: 'full' },
  { path: 'strona', component: MainPage },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
