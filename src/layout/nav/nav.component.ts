import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected account=inject(AccountService);
protected creds:any={}



login(){

  this.account.login(this.creds).subscribe({
    next:response=>
    {
     
      console.log(response);
      this.creds={};
    }
    ,
    error:error=>{
      console.log(error);
    }


  })

}

logout(){
  this.account.logout();
}
}
