import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { loginCreds, registerCreds, user } from '../../models/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<user | null>(null);
  private likesService = inject(LikesService);

  baseUrl = environment.apiUrl;

  register(creds: registerCreds) {
    return this.http.post<user>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  login(creds: loginCreds) {
    return this.http.post<user>(this.baseUrl + 'account/login', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user: user) {
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUser.set(user);
    this.likesService.getLikesId();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('filters');
    this.currentUser.set(null);
    this.likesService.clearLikesId();
  }
}