import { Component, computed, inject, input } from '@angular/core';
import { user, userDTO } from '../../../models/user';
import { RouterLink } from "@angular/router";
import { AgePipe } from '../../../core/pipes/age.pipe';
import { LikesService } from '../../../core/services/likes.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink,AgePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  private likeService=inject(LikesService);
user=input.required<userDTO>();
protected hasLiked=computed(()=> this.likeService.likesId().includes(this.user().id));


toggleLike(event:Event){
  event.stopPropagation();
  this.likeService.toggleLike(this.user().id).subscribe({
    next: ()=>{
      if(this.hasLiked()){
        this.likeService.likesId.update(ids => ids.filter(id => id !== this.user().id));
      }
      else{
        this.likeService.likesId.update(ids => [...ids, this.user().id]);
      }
    }
  });
}

}
