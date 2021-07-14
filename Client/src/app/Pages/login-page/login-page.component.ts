
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  url = 'http://166.48.21.182:5000/login';
  loginEndpoint = '';
  user = '';
  pass = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleLogin($e: Event) {
    this.http.post<string>(this.url, { username: this.user, password: this.pass }, { responseType: 'text' as 'json'}).subscribe(
         (data) => console.log(data), // data is string
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
