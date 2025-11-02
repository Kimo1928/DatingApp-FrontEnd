import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected account=inject(AccountService);
protected creds:any={}
private router=inject(Router);
private toast=inject(ToastService);



login(){

  this.account.login(this.creds).subscribe({
    next:(response)=>
    {
      this.toast.success('Login successful')  ;
     this.router.navigateByUrl('/users');
      console.log(response);
      this.creds={};
    }
    ,
    error:error=>{
      this.toast.error(error.error)  ;
    }


  })

}

logout(){
  this.account.logout();
  this.router.navigateByUrl('/');
}
}
