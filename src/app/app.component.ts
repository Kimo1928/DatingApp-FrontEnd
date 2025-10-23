import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, Signal } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users=signal<any>([]);
  // private http: HttpClient;
  constructor(private http:HttpClient) {}



  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response =>this.users.set(response) ,
      error: error => console.log(error) ,
      complete: () => console.log('Request completed')
    });
  }
}
