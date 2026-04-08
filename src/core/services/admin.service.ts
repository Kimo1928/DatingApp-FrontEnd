import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { user } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http=inject(HttpClient)
  baseUrl=environment.apiUrl;

  getUserWithRoles(){
    return this.http.get<user[]>(this.baseUrl+ 'admin/users-with-roles')
  }
  updateUserRoles(userId:string,roles:string[]){
    return this.http.post<string[]>(this.baseUrl+'admin/edit-role/'+userId+'?roles='+roles,{})
  }
}
