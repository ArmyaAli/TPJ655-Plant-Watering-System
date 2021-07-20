import { HttpClient } from '@angular/common/http';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { globalStateService } from 'src/app/State/global';

@Component({
  selector: 'app-device-status-component',
  templateUrl: './device-status-component.component.html',
  styleUrls: ['./device-status-component.component.css']
})


export class DeviceStatusComponent implements OnInit {
  statusUrl = "http://127.0.0.1:5000/status"
  status: string | null;
  constructor(private http: HttpClient, public state: globalStateService) {
      this.status = null
      const poll = timer(1000, 500 * 60 * 1); // POLL EVERY 1 minutes
      poll.subscribe(() => {
        this.http.get(this.statusUrl).subscribe(
        (data: any) => {
          this.state.status = data['status'];
        },
        (error) => {
          this.state.status = 'down';
        })
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
