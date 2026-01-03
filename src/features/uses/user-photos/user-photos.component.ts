import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../models/photo';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";
import { AccountService } from '../../../core/services/account.service';
import { userDTO } from '../../../models/user';
import { StarButtonComponent } from "../../../shared/star-button/star-button.component";
import { DeleteButtonComponent } from "../../../shared/delete-button/delete-button.component";

@Component({
  selector: 'app-user-photos',
  imports: [ImageUploadComponent, StarButtonComponent, DeleteButtonComponent],
  templateUrl: './user-photos.component.html',
  styleUrl: './user-photos.component.css'
})
export class UserPhotosComponent implements OnInit {
  
 protected userservice = inject(UserService);
  private route =inject (ActivatedRoute);
  protected accountService = inject(AccountService);
  photos=signal<Photo[]>([]);
  loading=signal(false);
ngOnInit(): void {
  this.loadUserPhotos();
}


loadUserPhotos(){
  const userId=this.route.parent?.snapshot.paramMap.get('id');
  if(userId)
this.userservice.getUserPhotos(userId).subscribe({
  next:photos=>{
    this.photos.set(photos);
  }
})     
    

}


onUploadImage(file:File){
  this.loading.set(true);
  this.userservice.uploadPhoto(file).subscribe({
    next:photo=>{ 
      this.userservice.editMode.set(false);
      this.loading.set(false);
      this.photos.update(currentPhotos=>[...currentPhotos,photo]);
      
      if(!this.userservice.user()?.imageUrl){
        this.setMainPhotoLocal(photo);
      
    }
    },
    error:err=>{
      this.loading.set(false);
      console.log(err);
    }
  })

}
setMainPhoto(photo:Photo){ 
  this.userservice.setMainPhoto(photo.id).subscribe({
    next:()=>{
      this.setMainPhotoLocal(photo);
    },
    error:err=>{
      console.log(err);
    }
  })
}

deletePhoto(photoId:number){
  this.userservice.deletePhoto(photoId).subscribe({
    next:()=>{
      this.photos.update(currentPhotos=>currentPhotos.filter(p=>p.id !== photoId.toString()));
    },
    
  })
}
setMainPhotoLocal(photo:Photo){
  const currentUser=this.accountService.currentUser();
  if(currentUser){
    currentUser.imageUrl=photo.url;
    this.accountService.setCurrentUser(currentUser);
    this.userservice.user.update(user=> ({
      ...user,
      imageUrl:photo.url
    }) as userDTO );
  }
}
}