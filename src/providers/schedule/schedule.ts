import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from '../../interface/Schedule';

@Injectable()
export class ScheduleProvider {

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
        data.forEach((element, index) => {
          element.id === id ? item.splice(index, 1) : null
          return this.storage.set('schedules', item)
            .then((e) => this.loadDataBase());
        });
      });
  }

  // archiveSchedule(id: string) {
  //   for (let i = 0; i < this.schedules.length; i++) {
  //     if (this.schedules[i].id === id) {
  //       this.schedules[i].isArchive = true;
  //     }
  //   }
  //   return this.storage.set('schedules', this.schedules);
  // }

  // restoreItemSchedule(id: string) {
  //   for (let i = 0; i < this.schedules.length; i++) {
  //     if (this.schedules[i].id === id) {
  //       this.schedules[i].isArchive = false;
  //     }
  //   }
  //   return this.storage.set('schedules', this.schedules);
  // }

  openSchedule(id: string) {
    return this.storage.get('schedules')
      .then((data: Item[]) => data.filter(item => item.id === id));
  }

}
