import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-device-status-component',
  templateUrl: './device-status-component.component.html',
  styleUrls: ['./device-status-component.component.css']
})

export class DeviceStatusComponent implements OnInit {
  constructor() {
      const poll = timer(1000, 1000 * 60 * 1); // POLL EVERY 5 minutes
      poll.subscribe(() => {
        // do some work
        console.log('Hello world')
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
