import { HttpClient } from '@angular/common/http';
import { inject, Injectable ,signal} from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableUser, user, userDTO } from '../../models/user';
import { AccountService } from './account.service';
import { Photo } from '../../models/photo';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private http =inject(HttpClient);
private accountService = inject(AccountService);
baseUrl = environment.apiUrl;
 editMode=signal(false);
 user=signal<userDTO|null>(null);

getUsers() {
  return this.http.get<userDTO[]>(this.baseUrl + 'Users');
}
getUser(id: string) { 
  return this.http.get<userDTO>(this.baseUrl + 'users/' + id).pipe(
   tap(
    user => {
      this.user.set(user);
    }
   ) 
  );
}

getUserPhotos(id: string) {
  return this.http.get<Photo[]>(this.baseUrl + 'users/' + id + '/photos');
}

updateUser(user: EditableUser) {
  return this.http.put(this.baseUrl + 'users' , user);

}

uploadPhoto(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<Photo>(this.baseUrl + 'users/add-photo', formData);
}
setMainPhoto(photoId: string) {
  return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
}

deletePhoto(photoId: number) {
  return this.http.delete(this.baseUrl + 'users/' + photoId);
}
}