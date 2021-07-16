import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(updateAccountDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-dashboard-update-dialog',
  templateUrl: './update-windows/update-account-dialog.html',
  styleUrls: [
    './update-windows/update-account.component.css',
  ]
})

export class updateAccountDialog {
  constructor(private http: HttpClient) {

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

