import { Component, computed, inject, input, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { userDTO } from '../../../models/user';
import { AgePipe } from '../../../core/pipes/age.pipe';
import { AccountService } from '../../../core/services/account.service';
import { PersenceService } from '../../../core/services/persence.service';
import { LikesService } from '../../../core/services/likes.service';

@Component({
  selector: 'app-user-detailed',
  imports: [RouterLink,RouterLinkActive,RouterOutlet , AgePipe],
  templateUrl: './user-detailed.component.html',
  styleUrl: './user-detailed.component.css'
})
export class UserDetailedComponent {
protected userService=inject(UserService);
private route=inject(ActivatedRoute);
protected presenceService = inject(PersenceService);
private accountService=inject(AccountService);
private router=inject(Router);
protected title=signal<string|undefined>('Profile');
private routeId=signal<string|null>(null);
protected likesService= inject(LikesService);
protected hasLiked=computed(()=> this.likesService.likesId().includes(this.routeId()!)); 
 protected isCurrentUser=computed(()=>{
  return this.accountService.currentUser()?.id===this.routeId();
 });
  constructor(){
    this.route.paramMap.subscribe(
      params =>{
        this.routeId.set(params.get('id'))
      }
    )
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
