import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpServiceService} from "../servis/http-service.service";
import {Login} from "../interface/login";
import {HttpErrorResponse} from "@angular/common/http";
import {Token} from "../interface/token";
import {tokenGetter} from "../app.module";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../servis/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  login: Login = {
    email: '',
    password: '',
  };

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email
      ]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
      ]]
    })
  }

  ngOnInit(): void {
  }

  onClick() {
    this.login = this.myForm.value;
    console.log(this.login)
    this.auth.login(this.login).subscribe(
      ()=>{this.route.navigate(['/strona'])}),
      (error: HttpErrorResponse) => {alert(error.message)}
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }
}
