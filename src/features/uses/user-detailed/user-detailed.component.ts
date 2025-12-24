import { Component, computed, inject, input, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { userDTO } from '../../../models/user';
import { AgePipe } from '../../../core/pipes/age.pipe';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-user-detailed',
  imports: [RouterLink,RouterLinkActive,RouterOutlet , AgePipe],
  templateUrl: './user-detailed.component.html',
  styleUrl: './user-detailed.component.css'
})
export class UserDetailedComponent {
protected userService=inject(UserService);
private route=inject(ActivatedRoute);

private accountService=inject(AccountService);
private router=inject(Router);
protected title=signal<string|undefined>('Profile');

 protected isCurrentUser=computed(()=>{
  return this.accountService.currentUser()?.id===this.route.snapshot.paramMap.get('id');
 });
  constructor(){
    const userId=this.route.snapshot.paramMap.get('id');
    if (!userId) {
      return ;
    }
  }
  ngOnInit(): void {  
    
    this.title.set(this.route.firstChild?.snapshot?.title );
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.title.set(this.route.firstChild?.snapshot?.title );
    });
  }
}
