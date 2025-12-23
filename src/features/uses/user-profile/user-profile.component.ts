import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userDTO } from '../../../models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private route =inject(ActivatedRoute);
  user =signal<userDTO|undefined>(undefined);  


   ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: data => {
        this.user?.set(data['user']);
      }
    })
   }
}
