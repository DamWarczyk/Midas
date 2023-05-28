import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Student} from "../interface/student";
import {HttpServiceService} from "../servis/http-service.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  student: Student = {
  name: '',
  surname: '',
  email: '',
  password: '',
}
  constructor(private fb: FormBuilder, private httpService: HttpServiceService) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]]
    })
    }

  ngOnInit(): void {

  }

   onClick() {
     console.log("Zarejstrowano");
     this.student = this.myForm.value
     this.httpService.addStudent(this.student).subscribe(
       (response: Student) => {console.log(response);},
       (error: HttpErrorResponse) => {alert(error.message)})
  }



  get name() {
    return this.myForm.get('name');
  }

  get surname() {
    return this.myForm.get('surname');
  }

  get email() {
    return this.myForm.get('email');
  }

  get password(){
    return this.myForm.get('password')
  }


}
