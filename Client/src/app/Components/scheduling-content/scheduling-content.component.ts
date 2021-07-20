import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-scheduling-content',
  templateUrl: './scheduling-content.component.html',
  styleUrls: ['./scheduling-content.component.css']
})
export class SchedulingContentComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(updateScheduleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  selected: Date | null;
  constructor(private http: HttpClient) {
    this.selected = null;
  }

  submitUpdatedInfo($e: any) {
    console.log($e)
    try {
      // this.http.post<any>(this.url, { data: 'Hello From the other side' });
    } catch (err) {
      console.error('Error [submitUpdatedInfo Proc]');
    }
  }
}
