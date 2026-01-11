import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userDTO,EditableUser, user } from '../../../models/user';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { AccountService } from '../../../core/services/account.service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-user-profile',
  imports: [DatePipe, FormsModule,TimeAgoPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit,OnDestroy {
 
  @ViewChild('editForm') editForm?:NgForm;
  @HostListener('window:beforeunload',['$event']) notify($event:BeforeUnloadEvent){
    if(this.editForm?.dirty){
      $event.preventDefault();
    }
  }
  protected accountService = inject(AccountService);  
  protected userservice = inject(UserService);
  private toast = inject(ToastService);
  

  protected editableUser:EditableUser
  ={
    displayName:'',
    description:'',
    city :'',
    country:''
  };

  constructor() { 
   
  } 
   ngOnInit(): void {
   
    this.editableUser={
      displayName:this.userservice.user()?.displayName||'',
      description:this.userservice.user()?.description,
      city:this.userservice.user()?.city||'',
      country:this.userservice.user()?.country||''
    }
   }

   updateProfile(){
    if(!this.userservice.user()) return ;
    const updatedUser ={...this.userservice.user(),...this.editableUser};
  this.userservice.updateUser(updatedUser).subscribe({
      next: () => {
        this.toast.success('Profile updated successfully');
        this.userservice.editMode.set(false);
        const currentUser=this.accountService.currentUser();
        if( currentUser
          && updatedUser.displayName!=this.accountService?.currentUser()?.displayName){
            currentUser.displayName=updatedUser.displayName;
            this.accountService.setCurrentUser(currentUser);
        
      }
        this.userservice.user.set(updatedUser as userDTO);
        this.editForm?.reset(this.editableUser);
      }
    });
    

   }
   ngOnDestroy(): void {
    this.userservice.editMode.set(false);
  }
}
