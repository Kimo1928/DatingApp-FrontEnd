import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { userDTO } from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private baseUrl=environment.apiUrl;
  private http=inject(HttpClient);
  likesId= signal<string[]>([]);
  constructor() { }


  toggleLike(targetUserId: string) {
    return this.http.post(`${this.baseUrl}likes/${targetUserId}`, {});
  }

  getLikes(predicate: string) { 

    return this.http.get<userDTO[]>(`${this.baseUrl}likes?predicate=${predicate}`);
  }
  getLikesId() {
    return this.http.get<string[]>(`${this.baseUrl}likes/list`).subscribe({
      next: (ids) => {
        this.likesId.set(ids);
      }
    })
  }

  clearLikesId() { 
    this.likesId.set([]);
   }
}
