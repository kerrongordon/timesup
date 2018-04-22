import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  title: string,
  body: string,
  date: string,
  time: string,
  color: string,
  id: number,
  isArchive: boolean,
  isDone: boolean
}

@Injectable()
export class ScheduleProvider {

  schedules: Item[];

  constructor(private storage: Storage) {
    console.log('Hello ScheduleProvider Provider');
  }

  addSchedule(data: Item) {
    this.schedules.push(data);
    return this.storage.set('schedules', this.schedules);
  }

  getSchedule() {
    return this.storage.get('schedules')
      .then((schedules) => {
        this.schedules = schedules == null ? [] : schedules;
        return this.schedules;
      })
  }

}
