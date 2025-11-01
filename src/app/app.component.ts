import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountService } from '../core/services/account.service';
import { HomeComponent } from "../features/home/home.component";
import { user } from '../models/user';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users=signal<user[]>([]);
  private accouintService=inject(AccountService);
  // private http: HttpClient;
  constructor(private http:HttpClient) {}



 async ngOnInit() {
    this.setCurrentUser();
  this.users.set(await this.getUsers());
  }

  setCurrentUser() {

    let userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.accouintService.currentUser.set(user);
    }

  }

  async getUsers() {  
    try {
      const token = JSON.parse(localStorage.getItem('token')!);
      const headers = token
        ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        : new HttpHeaders();
      
      return await lastValueFrom(
        this.http.get<user[]>('https://localhost:5001/api/Users', { headers })
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}
