import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs';
import { user, userDTO } from '../../../models/user';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
private userService =inject(UserService);
protected users$:Observable<userDTO[]>;
constructor(){
  this.users$=this.userService.getUsers();
}
}
