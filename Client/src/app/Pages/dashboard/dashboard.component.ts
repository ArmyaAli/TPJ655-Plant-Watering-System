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
  wateringTime = "10";
  invalidTimeGiven = false;
  constructor(private http: HttpClient, private state: globalStateService) {
    this.username = this.state.username;
  }

  ngOnInit(): void {
  }

  waterThePlant(): boolean | void {
    const wateringURL = "http://127.0.0.1:5000/water";
    const prod_wateringURL = "http://166.48.21.182:11000/water";

    if (this.invalidTimeGiven)
      return;

    this.invalidTimeGiven = false;
    this.state.status = 'watering'
    this.http.post<string>(prod_wateringURL, { status: "watering", time: this.wateringTime }, { responseType: 'text' as 'json' }).subscribe(
      (data: any) => {
        this.state.status = 'idle'
      },
      (error) => this.state.status = 'down'
    );
  }

  updateWateringTime(e: any) {
    this.wateringTime = e.target.value;

    if(this.wateringTime.length === 0) {
      this.invalidTimeGiven = false;
      return;
    }

    this.invalidTimeGiven = isNaN(Number(this.wateringTime)) ? true : false;
  }

}

