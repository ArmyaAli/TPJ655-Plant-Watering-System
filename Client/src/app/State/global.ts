import { Injectable } from '@angular/core';

@Injectable()
export class globalStateService {
    loggedIn: boolean;
    username: string;
    constructor() { 
        this.username = "";
        this.loggedIn = false;    }
}