import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { user, userDTO } from '../../models/user';
import { AccountService } from './account.service';
import { Photo } from '../../models/photo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private http =inject(HttpClient);
private accountService = inject(AccountService);
baseUrl = environment.apiUrl;
 

getUsers() {
  return this.http.get<userDTO[]>(this.baseUrl + 'Users');
}
getUser(id: string) { 
  return this.http.get<userDTO>(this.baseUrl + 'users/' + id);
}

getUserPhotos(id: string) {
  return this.http.get<Photo[]>(this.baseUrl + 'users/' + id + '/photos');
}

}


