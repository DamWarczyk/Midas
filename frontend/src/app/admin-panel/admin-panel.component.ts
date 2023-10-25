import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpServiceService} from "../servis/http-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {saveAs} from 'file-saver';

export interface AddRoleToUser {
  email: String;
  roleName: String;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  myForm: FormGroup;

  formRoleAdd: FormGroup;

  addRoletoUser!: AddRoleToUser;

  constructor(private fb: FormBuilder, private http: HttpServiceService, private _snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      roleName: ['', [Validators.required]]
    });

    this.formRoleAdd = this.fb.group({
      name: ['', [Validators.required]],
      });
  }

  openSnackBar(communicat: string) {
    this._snackBar.open(communicat, "OK");
  }


  ngOnInit(): void {
  }

  onClick() {
    this.addRoletoUser = this.myForm.value;
    this.http.addRoleToUser(this.addRoletoUser.email, this.addRoletoUser.roleName).subscribe(() => this.openSnackBar("Dodano role do użytkownika"));
  }

  addRole() {
    this.http.addRole(this.formRoleAdd.value).subscribe(() => this.openSnackBar("Dodano Role"));
  }

  downloadItemsXML() {
    this.http.exportItemsToXML().subscribe((data) => {saveAs(data, `items.xml`)})
  }
}
