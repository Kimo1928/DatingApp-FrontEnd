import { Component, inject, signal,OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { user } from '../../../models/user';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  @ViewChild('rolesModal') rolesModal!:ElementRef<HTMLDialogElement>

  adminService=inject(AdminService);
  protected users=signal<user[]>([])

  protected avaliableRoles=['Admin','Moderator','Member']
  protected selectedUser:user|null=null;
  ngOnInit(): void {
    this.getUsersWithRoles();
  }
  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next: response => this.users.set(response)
    })
  }
openRolesModal(user:user){
  this.selectedUser=user;
  this.rolesModal.nativeElement.showModal();
}
toggleRole(event:Event,role:string){
  if(!this.selectedUser) return;
  const isChecked=(event.target as  HTMLInputElement).checked;
  if(isChecked){
    this.selectedUser.roles.push(role);
}
  else{
    this.selectedUser.roles=this.selectedUser.roles.filter(r=>r!==role);
  }
}

updateUserRoles(){
  if(!this.selectedUser) return;
  this.adminService.updateUserRoles(this.selectedUser.id,this.selectedUser.roles).subscribe({
    next: updatedRoles =>{
      this.users.update(users=> users.map(u=>{
        if(u.id===this.selectedUser?.id){
          u.roles=updatedRoles;
          return u;
        }
        return u;
      }))
      this.rolesModal.nativeElement.close();
},
    error: error => console.log(error)
})
  }
}
