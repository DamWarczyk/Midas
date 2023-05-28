import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StronaGlownaComponent} from "./strona-glowna/strona-glowna.component";
import {ShopComponent} from "./shop/shop.component";



const routes: Routes = [
  { path: '', redirectTo: '/strona', pathMatch: 'full' },
  { path: 'strona', component: StronaGlownaComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
