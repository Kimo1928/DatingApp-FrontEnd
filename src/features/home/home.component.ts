import { Component,Input,signal } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { user } from '../../models/user';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

protected resgisterMode=signal(false);

showRegisterMode(value:boolean){
  this.resgisterMode.set(value);
}

}
