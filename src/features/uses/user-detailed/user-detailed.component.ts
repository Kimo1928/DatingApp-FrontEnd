import { Component, inject, input, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { userDTO } from '../../../models/user';
import { AgePipe } from '../../../core/pipes/age.pipe';

@Component({
  selector: 'app-user-detailed',
  imports: [RouterLink,RouterLinkActive,RouterOutlet , AgePipe],
  templateUrl: './user-detailed.component.html',
  styleUrl: './user-detailed.component.css'
})
export class UserDetailedComponent {
private userService=inject(UserService);
private route=inject(ActivatedRoute);
private router=inject(Router);
protected title=signal<string|undefined>('Profile');
 user=signal<userDTO|undefined>(undefined);
  constructor(){
    const userId=this.route.snapshot.paramMap.get('id');
    if (!userId) {
      return ;
    }
  }
  ngOnInit(): void {  
    this.route.data.subscribe({
      next: data => {
        this.user?.set(data['user']);
      }
    })
    this.title.set(this.route.firstChild?.snapshot?.title );
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.title.set(this.route.firstChild?.snapshot?.title );
    });
  }
}
