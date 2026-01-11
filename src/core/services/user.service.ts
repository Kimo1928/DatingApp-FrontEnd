import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable ,signal} from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableUser, user, userDTO, UserParams } from '../../models/user';
import { AccountService } from './account.service';
import { Photo } from '../../models/photo';
import { tap } from 'rxjs';
import { PaginatedResult } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private http =inject(HttpClient);
private accountService = inject(AccountService);
baseUrl = environment.apiUrl;
 editMode=signal(false);
 user=signal<userDTO|null>(null);

getUsers(userParams:UserParams) {
  let params=new HttpParams();
  params=params.append('pageNumber', userParams.pageNumber);
  params=params.append('pageSize', userParams.pageSize);
  params=params.append('minAge', userParams.minAge);
  params=params.append('maxAge', userParams.maxAge);
  params=params.append('OrderBy', userParams.orderBy);
  if(userParams.gender)
  params=params.append('Gender', userParams.gender);

  return this.http.get<PaginatedResult<userDTO[]>>(this.baseUrl + 'Users',{params}).pipe(
    tap(()=>{
      localStorage.setItem('filters',JSON.stringify(userParams));
    })
  )
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