import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesService } from '../../core/services/likes.service';
import { userDTO } from '../../models/user';
import { UserCardComponent } from "../uses/user-card/user-card.component";
import { PaginatedResult } from '../../models/pagination';
import { PaginatorComponent } from "../../shared/paginator/paginator.component";

@Component({
  selector: 'app-lists',
  imports: [UserCardComponent, PaginatorComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
  
  private likeService=inject(LikesService);
  protected users =signal<PaginatedResult<userDTO[]>|null>(null);
  protected predicate='liked';
  protected pageNumber=1;
  protected pageSize=5;
  tabs = [
    { label: 'Liked Users', value: 'liked' },
    { label: 'Liked Me', value: 'likedBy' },
    {label: 'Mutual', value: 'mutual' }
  ];

  
  ngOnInit(): void {
    this.loadLikes();
  }
  setPredicate(predicate:string){
    if(this.predicate!==predicate){
      this.predicate=predicate;
      this.pageNumber=1;
      this.loadLikes();
    }
  }
  loadLikes(){
    this.likeService.getLikes(this.predicate,this.pageNumber,this.pageSize).subscribe({
      next: users=>{
        this.users.set(users);
      }
    })
  }
  onPageChange(event:{pageNumber:number,pageSize:number})
  {
    this.pageNumber=event.pageNumber;
    this.pageSize=event.pageSize;
    this.loadLikes();
  }
}
