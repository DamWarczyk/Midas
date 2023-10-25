import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../interface/student";
import {environment} from "../../environments/environment";
import {Item} from "../interface/item";
import {Login} from "../interface/login";
import {Token} from "../interface/token";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private apiServerURL = environment.ApiBaseUrl;
  constructor(private http: HttpClient) {
  }

  public getStudent(): Observable<Student[]>{
    return this.http.get<any>(`${this.apiServerURL}/student/all`)
  }


  public addStudent(student: Student): Observable<Student>{
    return this.http.post<any>(`${this.apiServerURL}/student/add`, student);
  }
  public login(login: Login): Observable<Token>{
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>(`${this.apiServerURL}/login`, `email=${login.email}&password=${login.password}`, options)
  }


  public updateStudent(student: Student): Observable<Student>{
    return this.http.put<any>(`${this.apiServerURL}/student/update`, student);
  }

  public deleteStudent(studentId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/student/delete/${studentId}`);
  }

  public getItems(): Observable<Item[]>{
    return this.http.get<any>(`${this.apiServerURL}/item/all`)
  }

  public getItemById(id: number): Observable<Item>{
    return this.http.get<any>(`${this.apiServerURL}/item/find/${id}`);
  }


  public addItem(item: Item): Observable<Item>{
    return this.http.post<any>(`${this.apiServerURL}/item/add`, item);
  }

  public updateItem(item: Item, id: number): Observable<Item>{
    return this.http.put<any>(`${this.apiServerURL}/item/update/${id}`, item);
  }

  public deleteItem(itemId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/item/delete/${itemId}`);
  }

  public buyItem(itemId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/item/buyItem/${itemId}`);
  }

  public addRoleToUser(email: String, roleName: String): Observable<void>{
    return this.http.post<any>(`${this.apiServerURL}/student/role/addtouser`,
      {"email": email, "roleName": roleName});
  }

  public addRole(role: string): Observable<void>{
    return this.http.post<any>(`${this.apiServerURL}/student/role/add`, role);
  }

  public exportItemsToXML(): Observable<Blob>{
    return this.http.get(`http://localhost:8080/item/xml`, { responseType: 'blob' })
  }

}
