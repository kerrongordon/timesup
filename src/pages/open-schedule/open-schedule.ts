import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { Item } from '../../interface/Schedule';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-open-schedule',
  templateUrl: 'open-schedule.html',
})
export class OpenSchedulePage  {

  timer: number;
  data: Item;
  date: string;
  getId: string;
  endof: string;
  timeup: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleProv: ScheduleProvider,
    private alertCtrl: AlertController
  ) {
    this.getId = this.navParams.data.id
  }

  ionViewDidLoad() {
   this.loadData();
  }

  getDate() {
    if (!this.data) return;
    this.date = moment(this.data.date).format('dddd MMMM Do YYYY');
    return this.endof = moment(this.data.dateSet).endOf('day').fromNow();
  }

  loadData() {
    if (!this.getId) {
        return this.navCtrl.push('HomePage');
    }
    return this.scheduleProv.openSchedule(this.getId)
      .then(data => this.data = data[0])
      .then(() => this.getDate())
      .then(() => this.endof.match('ago') ? this.timeup = `Time's Up` : '');
  }

  deleteItem(id: string) {
    return this.scheduleProv.removeSchedule(id)
      .then(() => this.navCtrl.push('HomePage'));
  }

  deleteConfirm(id: string, title: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: `Are you sure you what to delete ${title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteItem(id);
          }
        }
      ]
    });
    alert.present();
  }

}
