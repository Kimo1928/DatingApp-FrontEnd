import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { registerCreds, user } from '../../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

 private http=inject(HttpClient);
 currentUser =signal<user|null>(null);
 baseUrl ='https://localhost:5001/api/';

setCurrentUser(user:user){
  this.currentUser.set(user);
  localStorage.setItem('user',JSON.stringify(user));
  localStorage.setItem('token',JSON.stringify(user.token));

}
 login(creds:any) {
    return this.http.post<user>(this.baseUrl + 'Account/login', creds).pipe(
      tap(user=>{

    if(user){
this.setCurrentUser(user);
    }
      })

    );
  }
  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  register(creds:registerCreds) {
    return this.http.post<user>(this.baseUrl + 'Account/register', creds).pipe(
      tap(user=>{

        if(user)
    this.setCurrentUser(user);
        
  })

  )};
}
