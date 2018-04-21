import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-schedule',
  templateUrl: 'new-schedule.html',
})
export class NewSchedulePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewSchedulePage');
  }

  getWeekDay(date) {
    const d = new Date(date);

    let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

    let day = weekday[d.getUTCDay()];
    return day;
  }

  onCreateSchedule(e) {
    console.log(e.value);
    const { date } = e.value;
    let test = this.getWeekDay(date);
    console.log(test);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
