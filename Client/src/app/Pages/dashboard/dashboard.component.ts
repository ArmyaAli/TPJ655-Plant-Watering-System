import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  url: string = '';
  submitEndpoint = ''
  triggerEndpoint = ''

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
  }

  waterThePlant() {
    console.log("I've been clicked");
    this.http.post<any>(this.url, { data: 'Hello From the other side'});
  }

  submitSchedule() {
    this.http.post<any>(this.url, { data: 'Hello From the other side'});
  }

}
