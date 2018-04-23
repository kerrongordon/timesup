import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ScheduleProvider, Item } from '../../providers/schedule/schedule';

@IonicPage()
@Component({
  selector: 'page-open-schedule',
  templateUrl: 'open-schedule.html',
})
export class OpenSchedulePage {

  data: Item;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleProv: ScheduleProvider
  ) {
  }

  ionViewDidLoad() {
   this.loadData();
  }

  loadData() {
    return this.scheduleProv.openSchedule(this.navParams.data.id)
      .then(data => this.data = data);
  }

}
