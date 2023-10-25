import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import { MainPage } from './main-page/main-page';
import {NavigatorComponent} from "./navigator/navigator.component";
import {ItemAdd, ItemBuy, ItemUpdate, ShopComponent} from './shop/shop.component';
import { NavigationModule } from './navigation.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import {HttpServiceService} from "./servis/http-service.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {JwtModule} from "@auth0/angular-jwt";
import {MatDialogModule} from "@angular/material/dialog";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {ErrorHandlerInterceptor} from "./interceptors/error-handler.interceptor";


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    NavigatorComponent,
    ShopComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ItemAdd,
    ItemUpdate,
    ItemBuy,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NavigationModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatMenuModule,
    NgbCarouselModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSnackBarModule,
    MatExpansionModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: "Authorization",
        authScheme: "",
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),

  ],
  providers: [HttpServiceService, {provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
