
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
  url = '';
  loginEndpoint = '';
  user = '';
  pass = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleLogin($e: Event) {
    this.http.post<any>(this.url, { username: this.user, password: this.pass});
  }

  updateUser(e: any) {
    this.user = e.target.value;
    console.log(this.user)
  }

  updatePass(e: any) {
    this.pass = e.target.value;
    console.log(this.pass)
  }

}
