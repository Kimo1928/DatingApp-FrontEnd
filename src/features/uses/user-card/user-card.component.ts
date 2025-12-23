import { Component, input } from '@angular/core';
import { user, userDTO } from '../../../models/user';
import { RouterLink } from "@angular/router";
import { AgePipe } from '../../../core/pipes/age.pipe';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink,AgePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
user=input.required<userDTO>();

}
