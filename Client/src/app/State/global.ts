import { Injectable } from '@angular/core';
import { accountInfo } from '../Components/account-info/account-info.component';

@Injectable()
export class globalStateService {
    loggedIn: boolean;
    username: string;
    SendQueue: any[];
    status: string | null;
    constructor() { 
        this.username = "";
        this.status = null; 
        this.loggedIn = false;    
        this.SendQueue = [];
    }
}