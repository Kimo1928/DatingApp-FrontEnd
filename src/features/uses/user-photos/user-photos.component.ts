import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../../../models/photo';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-photos',
  imports: [AsyncPipe],
  templateUrl: './user-photos.component.html',
  styleUrl: './user-photos.component.css'
})
export class UserPhotosComponent implements OnInit {
  
 private userservice = inject(UserService);
  private route =inject (ActivatedRoute);
  protected photos$?:Observable<Photo[]>
ngOnInit(): void {
  this.loadUserPhotos();
}


loadUserPhotos(){
  const userId=this.route.parent?.snapshot.paramMap.get('id');
  if(userId)
    this.photos$=this.userservice.getUserPhotos(userId) ; 
     
    

}
get photoMock(){
  return Array.from({length:12},(_,i)=>({
    url:'/user.jfif'
  }))
}


}


