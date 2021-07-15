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
    './dashboard-styles/dashboard-schedule.component.css',
    './dashboard-styles/dashboard-manual.component.css',
    './dashboard-styles/dashboard-account.component.css',
    './dashboard-styles/dashboard-device.component.css',
  ]
})


export class DashboardComponent implements OnInit {
  url: string = '';
  submitEndpoint = ''
  triggerEndpoint = ''
  username = '';

  constructor(private http: HttpClient, public dialog: MatDialog, private state: globalStateService) {
    this.username = this.state.username;
  }

  ngOnInit(): void {
  }

  waterThePlant() {
    console.log("I've been clicked");
    this.http.post<any>(this.url, { data: 'Hello From the other side' });
  }

  submitSchedule() {
    this.http.post<any>(this.url, { data: 'Hello From the other side' });
  }

  getAccountInfo() {

  }

  getDeviceStatus() {

  }

  openDialog() {
    const dialogRef = this.dialog.open(updateAccountDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-dashboard-update-windows',
  templateUrl: './update-windows/update-account.html',
  styleUrls: [
    './dashboard-styles/update-account.component.css',
  ]
})
export class updateAccountDialog { 
  constructor(private http: HttpClient) {

  }

  submitUpdatedInfo($e: any) {
    try {
      // this.http.post<any>(this.url, { data: 'Hello From the other side' });
    } catch(err) {
      console.error('Error [submitUpdatedInfo Proc]');
    }
  }
}

// @Component({
//   selector: 'app-dashboard-update-schedule',
//   templateUrl: './update-windows/update-schedule.html',
//   styleUrls: [
//     './dashboard-styles/update-schedule.component.css',
//   ]
// })
// export class updateScheduleDialog { }