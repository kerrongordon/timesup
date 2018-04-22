import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  title: string,
  body: string,
  date: string,
  time: string,
  color: string,
  id: string | Int32Array,
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

  removeSchedule(id: string) {
    for (let i = 0; i < this.schedules.length; i++) {
      if(this.schedules[i].id === id) {
        this.schedules.splice(i, 1);
      }
    }
    return this.storage.set('schedules', this.schedules);
  }

  archiveSchedule(id: string) {
    for (let i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i].id === id) {
        this.schedules[i].isArchive = true;
      }
    }
    return this.storage.set('schedules', this.schedules);
  }

  restoreItemSchedule(id: string) {
    for (let i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i].id === id) {
        this.schedules[i].isArchive = false;
      }
    }
    return this.storage.set('schedules', this.schedules);
  }

  openSchedule(id: string) {
    for (let i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i].id == id) {
        return Promise.resolve(this.schedules[i]);
      }      
    }
  }

}
