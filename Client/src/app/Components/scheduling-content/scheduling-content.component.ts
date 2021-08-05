import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { globalStateService } from 'src/app/State/global';

export interface Schedule {
  id: number;
  days: string[];
  hour: number;
  minute: number;
  dayHalf: "AM" | "PM" | null;
  repeating: boolean;
};

@Component({
  selector: 'app-scheduling-content',
  templateUrl: './scheduling-content.component.html',
  styleUrls: ['./scheduling-content.component.css']
})

export class SchedulingContentComponent implements OnInit {
  scheduleUrl = "http://127.0.0.1:5000/schedule"
  prod_scheduleUrl = "http://166.48.21.182:11000/schedule"
  wateringTime = "10";
  invalidTimeGiven = false;
  constructor(public dialog: MatDialog, private http: HttpClient, public state: globalStateService, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.http.get<any>(this.prod_scheduleUrl, { params: { user: this.state.username } }).subscribe((data: {data: any}) => {
      const items = data.data;
      console.log(data.data)
      for(const item of items) {
        this.state.schedules.push(
          {
            id: item.id,
            days: item.days.split(','),
            hour: item.hour,
            minute: item.minute,
            dayHalf: item.dayHalf,
            repeating: item.repeating
          }
        )
      }
    });
  }

  deleteSchedule(id: number) {
    const index = this.state.schedules.findIndex((element) => element.id == id)
    this.state.schedules.splice(index, 1);
    this.http.delete(this.prod_scheduleUrl, {params: {user: this.state.username, toDelete: id}}).subscribe(() => {
      console.log('passed')
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(updateScheduleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (this.state.schedules.length > 0) {
        this.http.post<any>(this.prod_scheduleUrl, this.state.schedules, { params: { user: this.state.username, time: this.wateringTime } }).subscribe((e) => {
          console.log(e)
        });
      }
    });
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

@Component({
  selector: 'app-dashboard-schedule-dialog',
  templateUrl: './update-windows/update-schedule-dialog.component.html',
  styleUrls: [
    './update-windows/update-schedule-dialog.component.css',
  ]
})

export class updateScheduleDialogComponent {
  days: string[];
  hour: number;
  minute: number;
  dayHalf: "AM" | "PM" | null;
  repeating = false;
  errorMsg = "";
  url = "http:/127.0.0.1:5000/schedule"
  constructor(private http: HttpClient, public dialog: MatDialog, public state: globalStateService) {
    this.days = [];
    this.hour = 0;
    this.minute = 0;
    this.dayHalf = null;
  }

  setRepeating(e: MatButtonToggleChange) {
    this.repeating = e.source.checked
  }

  selectionChange(e: MatButtonToggleChange) {
    this.days = e.value;
  }

  dayHalfSelectionChange(e: MatButtonToggleChange) {
    this.dayHalf = e.value;
  }

  updateHours(e: any) {
    this.hour = e.target.value;
  }

  updateMinutes(e: any) {
    this.minute = e.target.value;
  }

  submitUpdatedInfo($e: any) {

    if (this.state.schedules.length === 3) {
      this.errorMsg = "You may only have 3 active schedules at a time."
      this.dialog.closeAll();
      return;
    }

    if (!(this.hour >= 1 && this.hour <= 12)) {
      this.errorMsg = "The hour must be between 1 and 12."
      return;
    }

    if (!(this.minute >= 0 && this.minute <= 59)) {
      this.errorMsg = "The minute must be between 0 and 59."
      return;
    }

    if (this.dayHalf === null) {
      this.errorMsg = "You must choose AM or PM."
      return;
    }

    if (this.days.length == 0) {
      this.errorMsg = "Please choose atleast one day. Choose todays day to scheduel for today"
      return;
    }

    try {
      this.state.schedules.push(
        {
          id: this.state.schedules.length + 1,
          days: this.days,
          hour: this.hour,
          minute: this.minute,
          dayHalf: this.dayHalf,
          repeating: this.repeating
        });

      this.dialog.closeAll();

    } catch (err) {
      console.error('Error [submitUpdatedInfo Proc]');
    }
  }
}

