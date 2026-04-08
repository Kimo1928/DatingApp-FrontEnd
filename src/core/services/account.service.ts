import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { loginCreds, registerCreds, user } from '../../models/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';
import { PersenceService } from './persence.service';
import { HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<user | null>(null);
  private likesService = inject(LikesService);
  private presenceService =inject(PersenceService) 
  baseUrl = environment.apiUrl;

  register(creds: registerCreds) {
    return this.http.post<user>(this.baseUrl + 'account/register', creds,
      {withCredentials:true}
    ).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
          this.startTokenRefresh();
        }
      })
    )
  }
  refreshToken(){
    return this.http.post<user>(this.baseUrl + 'account/refresh-token',{},
      {withCredentials:true})
  }

  startTokenRefresh(){
    setInterval(()=>{
      this.http.post<user>(this.baseUrl + 'account/refresh-token',{},
        {withCredentials:true}).subscribe({
          next: user => {this.setCurrentUser(user)},
          error: ()=>{this.logout()}
        }) 
    },6*60*1000)
  }
  login(creds: loginCreds) {
    return this.http.post<user>(this.baseUrl + 'account/login', creds
      ,{withCredentials:true}
    ).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
          this.startTokenRefresh();
        }
      })
    )
  }

  setCurrentUser(user: user) {
    user.roles=this.getRolesFromToken(user);
    this.currentUser.set(user);
    this.likesService.getLikesId();
    if(this.presenceService.hubConnection?.state!==HubConnectionState.Connected)
      this.presenceService.createHubConccetion(user);
  }

  logout() {
    localStorage.removeItem('filters');
    localStorage.removeItem('userParams');
    this.currentUser.set(null);
    this.likesService.clearLikesId();
    this.presenceService.stopHubConnection();
  }



  private getRolesFromToken(user:user): string[]{

    const payload= user.token.split('.')[1];
    const decoded = atob(payload);
    const jsonPayload= JSON.parse(decoded)
    return Array.isArray(jsonPayload.role) ? jsonPayload.role : [jsonPayload.role]
  }
}