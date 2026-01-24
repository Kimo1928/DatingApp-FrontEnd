import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { PaginatedResult } from '../../models/pagination';
import { Message } from '../../models/message';
import { PaginatorComponent } from "../../shared/paginator/paginator.component";
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [PaginatorComponent, RouterLink,DatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
  
  protected messsageService=inject(MessageService)
  protected container='Inbox';
  protected fetchedContainer='Inbox';
  protected pageNumber=1
  protected pageSize=10
  tabs=[
    {label:'Inbox',value:'Inbox'},
    {label:'Outbox',value:'Outbox'},
  ]

  protected paginatedMessages=signal<PaginatedResult<Message> |null>(null)


  get isInbox(){
    return this.fetchedContainer==='Inbox'
  }
  deleteMessage(event: Event, id: string) {
    console.log('Deleting message with id:', id);
    event.stopPropagation();
  
    this.messsageService.deleteMesssage(id).subscribe({
      next: () => {
        const current=this.paginatedMessages();
        if(current?.items){
        this.paginatedMessages.update(prev => {
          if (!prev) return prev; 
          const newItems = prev.items.filter(m => m.id !== id);
      
          return {
           items: newItems,
          metadata: prev.metadata
          } as PaginatedResult<Message>;
        });
      }
      }
    });
  }
  setContainer(value:string){
    this.container=value;
    this.pageNumber=1;
    this.loadMessages();
  }
  onPageChange(event:{pageNumber:number,pageSize:number})
  {
    this.pageNumber=event.pageNumber;
    this.pageSize=event.pageSize;
    this.loadMessages();
  }

    ngOnInit(): void {
      this.loadMessages();
    }
    loadMessages(){
      this.messsageService.getMessages(this.container,this.pageNumber,this.pageSize).subscribe({
        next:response => {this.paginatedMessages.set(response)
        this.fetchedContainer=this.container; 
        }
      })
    }
}
