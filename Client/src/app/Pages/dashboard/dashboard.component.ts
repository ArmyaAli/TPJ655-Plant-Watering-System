import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { globalStateService } from 'src/app/State/global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard-styles/dashboard.component.css',
    './dashboard-styles/dashboard-manual.component.css',
  ]
})


export class DashboardComponent implements OnInit {
  username = '';

  constructor(private http: HttpClient, private state: globalStateService) {
    this.username = this.state.username;
  }

  ngOnInit(): void {
  }

  waterThePlant() {
    const wateringURL = "http://127.0.0.1:5000/water";
    this.state.status = 'watering'
    this.http.post<string>(wateringURL, { status: "watering" }, { responseType: 'text' as 'json' }).subscribe(
      (data: any) => {
        this.state.status = 'idle'
      },
      (error) => this.state.status = 'down'
    );
  }

  submitSchedule() {
    const url = "http://";
    this.http.post<any>(url, { data: 'Hello From the other side' });
  }

  getAccountInfo() {

  }

  getDeviceStatus() {

  }
}

