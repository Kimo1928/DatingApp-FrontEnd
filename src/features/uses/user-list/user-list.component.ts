import { Component, inject, OnInit, signal,ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

import { userDTO, UserParams } from '../../../models/user';

import { UserCardComponent } from "../user-card/user-card.component";
import { PaginatedResult } from '../../../models/pagination';
import { PaginatorComponent } from "../../../shared/paginator/paginator.component";
import { FilterModalComponent } from '../filter-modal/filter-modal.component';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent, PaginatorComponent, FilterModalComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  @ViewChild('filterModal') modal!:FilterModalComponent
private userService =inject(UserService);
protected paginatedUsers=signal<PaginatedResult<userDTO[]>|null>(null);
userParams =new UserParams();
private updatedParams=new UserParams();
constructor(){
  const filters=localStorage.getItem('filters');
  if(filters){
    this.userParams=JSON.parse(filters);
    this.updatedParams=JSON.parse(filters);
    
  }
}
  ngOnInit(): void {
    this.loadUsers();
  }
loadUsers(){  
  
  this.userService.getUsers(this.userParams).subscribe({
    next:(result)=>{
      this.paginatedUsers.set(result);
    }
   });
} 
onPageChanged(event:{pageNumber:number,pageSize:number}){
this.userParams.pageNumber=event.pageNumber;
this.userParams.pageSize=event.pageSize;
this.loadUsers();


  }
  openModal(){
    this.modal.open();
  }
  onClose(){
  
  }
  OnFilterChanged(data:UserParams){
    this.updatedParams={...data};
    this.userParams={...data};
    this.loadUsers();
  }
  resetFilters(){
    this.userParams=new UserParams();
    this.updatedParams=new UserParams();
    this.loadUsers();
  }

  get displayMessage():string{
    const defaultParams=new UserParams();
    const filters:string[]=[];
    if(this.updatedParams.gender)
      filters.push(this.updatedParams.gender + 's');
    else 
      filters.push('Males , Females');

    if(this.updatedParams.minAge !== defaultParams.minAge || this.updatedParams.maxAge !== defaultParams.maxAge)
      filters.push(`Ages  ${this.updatedParams.minAge} - ${this.updatedParams.maxAge}`);
    
    filters.push(this.updatedParams.orderBy === 'lastActive' ? 'Recently Active' : 'Newest Users');


    return filters.length? `Selected: ${filters.join(' | ')} ` : 'All Users';
  }
}
