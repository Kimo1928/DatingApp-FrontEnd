import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../models/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
 private router=inject(Router);
 protected error:ApiError;
 protected showDetails=false;
  constructor() {
      
    const navigation=this.router.getCurrentNavigation();
    this.error=navigation?.extras?.state?.['error'];
    
  }
  detailsToggled(){
    this.showDetails=!this.showDetails;
  }

}
