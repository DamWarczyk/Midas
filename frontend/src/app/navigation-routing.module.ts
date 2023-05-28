import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./shop/shop.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {IsAdminGuard} from "./is-admin.guard";

const routes: Routes = [ { path: 'oferta', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate:[IsAdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
