import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { globalStateService } from 'src/app/State/global';


interface accountInfo {
  username: string;
  fName: string;
  lName: string;
  address: string;
  model: string;
};

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})

export class AccountInfoComponent implements OnInit {
  data: accountInfo | null;
  constructor(public dialog: MatDialog, private http: HttpClient, private state: globalStateService, private route: ActivatedRoute) { 
    this.data = null;
    this.route.queryParams.subscribe(params => {
        this.state.username = params['user'];
    });
  }

  ngOnInit(): void {
    // we can make a server request
    const accountInfoUrl = 'http://127.0.0.1:5000/accountInfo'
    this.http.get<any>(accountInfoUrl, {
      params: {
        user: this.state.username
      }
    }).subscribe((data: accountInfo) => {
      this.data = data;
    });
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
  constructor(private http: HttpClient, public dialog: MatDialog) {

  }

  submitUpdatedInfo($e: any) {
    console.log($e)
    try {
      // this.http.post<any>(this.url, { data: 'Hello From the other side' });
      this.dialog.closeAll();
    } catch (err) {
      console.error('Error [submitUpdatedInfo Proc]');
    }
  }
}

