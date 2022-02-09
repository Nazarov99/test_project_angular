import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UsersList} from "../Interfaces/users-list";

@Injectable({
  providedIn: 'root'
})
export class InternalApiService {
  private apiVersion = environment.apiUrl;
  constructor(private http: HttpClient,) { }

  private formUrl(methodUri: any) {
    return `${this.apiVersion}/${methodUri}`;
  }

  getParams(filterParams: any) {
    const paramKeys: {[index: string]:any} = {};

    if (filterParams) {

      if (filterParams.hasOwnProperty('page') && filterParams.page) {
        paramKeys['page'] = filterParams['page'];
      }

      if (filterParams.hasOwnProperty('pageSize') && filterParams.pageSize) {
        paramKeys['pageSize'] = filterParams['pageSize'];
      }

      if (filterParams.hasOwnProperty('name') && filterParams.name) {
        paramKeys['name'] = filterParams['name'];
      }

    }

    return paramKeys;
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrlV1 + 'oauth/token', data);
  }

  checkLogin(): Observable<any> {
    return this.http.get<any>(this.formUrl('user'))
  }

  getContactList(filterParams: any): Observable<UsersList> {
    const params = new HttpParams({ fromObject: this.getParams(filterParams)});
    return this.http.get<UsersList>(this.formUrl('getUserList'), {params});
  }

  addUser(body: any): Observable<any> {
    return this.http.post<any>(this.formUrl('addUser'), body);
  }

  updateUser(id: number, body: any): Observable<any> {
    return this.http.put<any>(this.formUrl(`updateUser/${id}`), body);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.formUrl(`deleteUser/${id}`));
  }

  public getToken() {
    return !!localStorage.getItem('token');
  }
}
