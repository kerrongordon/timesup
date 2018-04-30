import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from '../../interface/Schedule';

@Injectable()
export class ScheduleProvider {

  schedules: Item[];
  stream = new BehaviorSubject<Item[]>([]);
  cast = this.stream.asObservable();

  constructor(
    private storage: Storage,
  ) {
    this.loadDataBase();
  }

  loadDataBase() {
    return this.storage.get('schedules')
      .then((data) => this.stream.next(data));
  }

  addSchedule(newitem: Item) {
    this.stream.getValue() === null ? this.schedules = [] : this.schedules = this.stream.getValue();
    this.schedules.push(newitem);
    this.stream.next(this.schedules);
    return this.storage.set('schedules', this.schedules);
  }

  removeSchedule(id: string) {
    this.schedules = this.stream.getValue().filter(data => data.id !== id);
    this.stream.next(this.schedules);
    return this.storage.set('schedules', this.schedules);
  }

  openSchedule(id: string) {
    return this.storage.get('schedules')
      .then((data: Item[]) => data.filter(item => item.id === id));
  }

}
