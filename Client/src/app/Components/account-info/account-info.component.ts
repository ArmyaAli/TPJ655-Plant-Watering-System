import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { globalStateService } from 'src/app/State/global';


export interface accountInfo {
  username: string;
  fName: string;
  lName: string;
  address: string;
  model?: string;
};

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})

export class AccountInfoComponent implements OnInit {
  data: accountInfo | null;
  constructor(public dialog: MatDialog, private http: HttpClient, private state: globalStateService, private route: ActivatedRoute, private router: Router) {
    this.data = null;
    this.route.queryParams.subscribe(params => {
      this.state.username = params['user'];
    });
  }

  ngOnInit(): void {
    // we can make a server request
    const accountInfoUrl = 'http://127.0.0.1:5000/accountInfo'
    const updateInfoURL = 'http://127.0.0.1:5000/accountInfo'
    this.http.get<any>(accountInfoUrl, {
      params: {
        user: this.state.username
      }
    }).subscribe((data: accountInfo) => {
      console.log(data)
      this.data = data;
    });

    this.dialog.afterAllClosed.subscribe((data) => {
      if (this.state.SendQueue.length > 0) {
        const newData = this.state.SendQueue.shift()
        this.http.post<any>(updateInfoURL, newData, { params: { user: this.state.username } }).subscribe((data) => {
          
          if (data.status === 'success') {
            this.router.navigate([],
              {
                queryParams: {
                  user: newData.username
                }
              })
              this.data!.username = newData.username;
          }
        });
      }
    })

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
  data = {
    username: "",
    fName: "",
    lName: "",
    addr: "",
  };

  constructor(private http: HttpClient, public dialog: MatDialog, private state: globalStateService) {

  }

  updateUsername(e: any) {
    this.data.username = e.target.value;
  }
  updateFname(e: any) {
    this.data.fName = e.target.value;
  }
  updateLname(e: any) {
    this.data.lName = e.target.value;
  }
  updateAddr(e: any) {
    this.data.addr = e.target.value;
  }

  submitUpdatedInfo($e: any) {
    try {
      for (const key in this.data) {
        if (this.data[key as 'username' | 'fName' | 'lName' | 'addr'].length > 0) {
          this.state.SendQueue.push(this.data);
          break;
        }
      }


      this.dialog.closeAll();
    } catch (err) {
      console.error('Error [submitUpdatedInfo Proc]');
    }
  }
}

