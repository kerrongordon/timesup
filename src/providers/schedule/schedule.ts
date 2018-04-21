import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ScheduleProvider Provider');
  }

}
