
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { globalStateService } from 'src/app/State/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  url = 'http://127.0.0.1:5000/login';
  loginEndpoint = '';
  user = '';
  pass = '';

  constructor(private http: HttpClient, private state: globalStateService, private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin($e: Event) {
    this.http.post<string>(this.url, { username: this.user, password: this.pass }, { responseType: 'text' as 'json' }).subscribe(
      (rawdata: any) => {
        try {
          const data = JSON.parse(rawdata);
          const status = data['status'];
          if (status == 'success') {
            this.router.navigate(['/dashboard'],
            {
              queryParams: {
                user: this.user
              }
            })
            this.state.loggedIn = true;
            this.state.username = this.user;
          } else {
            console.log('not successful')
          }
        } catch (err) {
          console.error('Error [Proc handleLogin]');
        }
      },
      (error) => console.log(error)
    );
  }

  updateUser(e: any) {
    this.user = e.target.value;
  }

  updatePass(e: any) {
    this.pass = e.target.value;
  }

}
