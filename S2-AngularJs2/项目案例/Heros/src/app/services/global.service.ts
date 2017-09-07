import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  serverUrl:string;
  constructor() {
    this.serverUrl='http://127.0.0.1:3000';
  }
}
