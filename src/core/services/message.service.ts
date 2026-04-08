import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '../../models/message';
import { PaginatedResult } from '../../models/pagination';
import { AccountService } from './account.service';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl=environment.apiUrl
  private http =inject(HttpClient);
  private hubUrl = environment.hubUrl;
  private hubConnection?:HubConnection
  messageThread=signal<Message[]>([]);
  private accountService = inject(AccountService);




  createHubConnection(otherUserId:string){
    const currentUser = this.accountService.currentUser()
    if(!currentUser) return; 
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl +'messages?userId='+otherUserId,{
      accessTokenFactory:()=>currentUser.token
    })
    .withAutomaticReconnect()
    .build();


    this.hubConnection.start().catch(error=>console.log(error))

    this.hubConnection.on("ReceiveMessageThread",(messages:Message[])=>{
      this.messageThread.set(messages.map(message =>({
        ...message,
        CurrentUserSender: message.senderId !== otherUserId
      })));
    })

    this.hubConnection.on("NewMessage",(message:Message) =>{
      message.CurrentUserSender=message.senderId===currentUser.id;
      this.messageThread.update(messages =>[...messages,message])
    })

  }


  stopHubConnection(){
    if(this.hubConnection?.state===HubConnectionState.Connected)
    this.hubConnection.stop().catch(error=>console.log())
  }

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
    return this.hubConnection?.invoke('SendMessage',{recipientId,content})
   }

   deleteMesssage(messageId:string){
    return this.http.delete(this.baseUrl+'messages/'+messageId)
   }


}
