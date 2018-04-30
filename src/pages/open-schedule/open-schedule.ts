import { Component } from '@angular/core';
import { NavParams, IonicPage, AlertController, NavController } from 'ionic-angular';
import { Item } from '../../interface/Schedule';
import * as moment from 'moment';
import { ScheduleProvider } from '../../providers/schedule/schedule';

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
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private scheduleProv: ScheduleProvider,
  ) {
    this.data = this.navParams.data.data
  }

  ionViewDidLoad() {
    this.getDate();
    !this.data ? this.navCtrl.push('HomePage') : null;
  }

  getDate() {
    if (!this.data) return;
    this.date = moment(this.data.date).format('dddd MMMM Do YYYY');
    return this.endof = moment(`${this.data.date}T${this.data.time}`).endOf('minute').fromNow();
  }

  willDelete(id: string) {
    return this.scheduleProv.removeSchedule(id);
  }

  deleteItem(event) {
    const alertCtrl = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: `Are you sure you what to delete ${event.title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.willDelete(event.id).then(() => this.navCtrl.pop());
          }
        }
      ]
    });
    return alertCtrl.present();
  }

}
