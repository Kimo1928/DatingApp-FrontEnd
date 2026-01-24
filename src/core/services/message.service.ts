import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '../../models/message';
import { PaginatedResult } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl=environment.apiUrl
  private http =inject(HttpClient)


  getMessages(container:string,pageNumber:number,pageSize:number){
    let params=new HttpParams();
    params=params.append('PageNumber',pageNumber);
    params=params.append('PageSize',pageSize);
    params=params.append('container',container);
    return this.http.get<PaginatedResult<Message>>(`${this.baseUrl}`+'messages',{params})

  }
  getMessageThread(userId:string){ 
    return this.http.get<Message[]>(this.baseUrl+'messages/thread/'+userId)


   }
   sendMessage(recipientId:string,content:string){
    return this.http.post<Message>(this.baseUrl+'messages',{recipientId,content})
   }

   deleteMesssage(messageId:string){
    return this.http.delete(this.baseUrl+'messages/'+messageId)
   }


}
