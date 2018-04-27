import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from '../../interface/Schedule';

@Injectable()
export class ScheduleProvider {

  removeItem: Item[];
  stream = new BehaviorSubject<Item[]>([]);
  cast = this.stream.asObservable();

  constructor(private storage: Storage) {
    this.loadDataBase();
  }

  loadDataBase() {
    return this.storage.get('schedules')
      .then((data) => this.stream.next(data));
  }

  addSchedule(newitem: Item) {
    return this.storage.get('schedules')
      .then((data: Item[]) => {
        const d = data == null ? [] : data
        d.push(newitem)
        return this.storage.set('schedules', d)
          .then((e) => this.stream.next(e));
      });
  }

  removeSchedule(id: string) {
    let item = this.stream.getValue();
    return this.storage.get('schedules')
      .then((data: Item[]) => {
        for (let i = 0; i < data.length; i++) {
          data[i].id === id ? item.splice(i, 1) : null
          this.removeItem = item;
        }
      }).then(() => {
        return this.storage.set('schedules', this.removeItem)
          .then((e) => this.stream.next(e));
      });
  }

  openSchedule(id: string) {
    return this.storage.get('schedules')
      .then((data: Item[]) => data.filter(item => item.id === id));
  }

}
