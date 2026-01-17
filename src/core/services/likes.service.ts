import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { userDTO } from '../../models/user';
import { PaginatedResult } from '../../models/pagination';
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

  getLikes(predicate: string, pageNumber: number, pageSize: number) { 
    let params= new HttpParams();
    params= params.append('pageNumber', pageNumber);
    params= params.append('pageSize', pageSize);
    params= params.append('predicate', predicate);
    return this.http.get<PaginatedResult<userDTO[]>>(`${this.baseUrl}`+'likes', {params});
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
