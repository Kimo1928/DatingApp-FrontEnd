import { NgClass, NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountService } from '../core/services/account.service';
import { HomeComponent } from "../features/home/home.component";
import { user } from '../models/user';

import { Router, RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";


@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterOutlet, NgClass, ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'Dating App';

  
  protected router=inject(Router);
  // private http: HttpClient;
  constructor() {}





  

  

 
}
