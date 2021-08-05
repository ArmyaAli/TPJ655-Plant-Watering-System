import { Injectable } from '@angular/core';
import { accountInfo } from '../Components/account-info/account-info.component';
import { Schedule } from '../Components/scheduling-content/scheduling-content.component';

@Injectable()
export class globalStateService {
    loggedIn: boolean;
    username: string;
    SendQueue: any[];
    status: string | null;
    schedules: Schedule[];
    constructor() { 
        this.username = "";
        this.status = null; 
        this.loggedIn = false;    
        this.SendQueue = [];
        this.schedules = [];
    }
}