import { Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { UserService } from '../../../core/services/user.service';
import { Message } from '../../../models/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-messages',
  imports: [DatePipe , TimeAgoPipe,FormsModule],
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.css'
})
export class UserMessagesComponent implements OnInit {
  @ViewChild('messageEndRef') messageEndRef!:ElementRef;
  messageService=inject(MessageService)
  userService=inject(UserService)

  protected messages=signal<Message[]>([])

  protected messageContent:string='';

  constructor(){
    effect(()=>{
      const currentMessages=this.messages();
      if(currentMessages.length>0){
        this.scrollToBottom();
      }
    })
  }
  ngOnInit():void{
    this.loadMessages();

  }
  loadMessages(){
    const userId=this.userService.user()?.id;
    if(userId){
      this.messageService.getMessageThread(userId).subscribe({
        next:messages=>{
          this.messages.set(messages.map(message =>({
            ...message,
            CurrentUserSender: message.senderId !== userId
          })));
        },
      
      })
    }
  }


  sendMessage(){
    const recipientId=this.userService.user()?.id;
    if(!recipientId) return;
    this.messageService.sendMessage(recipientId,this.messageContent).subscribe({
      next:message=>{
        this.messages.update(messages=>{
          message.CurrentUserSender=true;
          return[...messages,
            message,
          ]
        });
        this.messageContent='';
      }
    })
  }
  scrollToBottom(){
    setTimeout(()=>{
      if(this.messageEndRef){
        this.messageEndRef.nativeElement.scrollIntoView({behavior:'smooth'});
      }
    })
  
  }
}
