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
    const url = "http://166.48.21.182:1600/water";
    this.http.post<string>(url, { status: "watering" }, { responseType: 'text' as 'json' }).subscribe(
      (rawdata: any) => {
        try {
          const data = JSON.parse(rawdata);
          
        } catch (err) {
          console.error('Error [Proc handleLogin]');
        }
      },
      (error) => console.log(error)
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

