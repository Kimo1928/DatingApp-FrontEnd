import { Component, effect, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { UserService } from '../../../core/services/user.service';
import { Message } from '../../../models/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { FormsModule } from '@angular/forms';
import { PersenceService } from '../../../core/services/persence.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-messages',
  imports: [DatePipe , TimeAgoPipe,FormsModule],
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.css'
})
export class UserMessagesComponent implements OnInit, OnDestroy{
  @ViewChild('messageEndRef') messageEndRef!:ElementRef;
  messageService=inject(MessageService)
  userService=inject(UserService)


  private route = inject(ActivatedRoute);

  protected presenceService = inject(PersenceService)

  protected messageContent:string='';

  constructor(){
    effect(()=>{
      const currentMessages=this.messageService.messageThread();
      if(currentMessages.length>0){
        this.scrollToBottom();
      }
    })
  }
  
  ngOnInit():void{
    this.route.parent?.paramMap.subscribe({
      next:params =>{
        const otherUserId= params.get('id');
        if(!otherUserId)
          throw new Error('Cannot connect to hub ');
        this.messageService.createHubConnection(otherUserId);
      }
      
    })

  }
  


  sendMessage(){
    const recipientId=this.userService.user()?.id;
    if(!recipientId) return;
    this.messageService.sendMessage(recipientId,this.messageContent)?.then(
      ()=>this.messageContent=''
    )
    
  }
  scrollToBottom(){
    setTimeout(()=>{
      if(this.messageEndRef){
        this.messageEndRef.nativeElement.scrollIntoView({behavior:'smooth'});
      }
    })
  
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
