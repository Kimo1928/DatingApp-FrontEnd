import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerCreds, user } from '../../models/user';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
protected creds ={} as registerCreds ;
protected account=inject(AccountService);
cancelRegister =output<boolean>();



register(){
 this.account.register(this.creds).subscribe({
  next: response => {
    console.log(response);
  this.cancel(); },
  error: error => {console.log(error);}
 })
}
cancel(){
  console.log('cancelled!');
  this.cancelRegister.emit(false);
}
}
