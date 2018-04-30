import { Component } from '@angular/core';
import { NavParams, IonicPage, Events } from 'ionic-angular';
import { Item } from '../../interface/Schedule';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-open-schedule',
  templateUrl: 'open-schedule.html',
})
export class OpenSchedulePage  {

  data: Item;
  date: string;
  endof: string;

  constructor(
    public navParams: NavParams,
    public events: Events,
  ) {
    this.data = this.navParams.data.data
  }

  ionViewDidLoad() {
    this.getDate();
  }

  getDate() {
    if (!this.data) return;
    this.date = moment(this.data.date).format('dddd MMMM Do YYYY');
    return this.endof = moment(`${this.data.date}T${this.data.time}`).endOf('minute').fromNow();
  }

  deleteItem(id: string, title: string) {
    return this.events.publish('status:delete', id, title);
  }

}
