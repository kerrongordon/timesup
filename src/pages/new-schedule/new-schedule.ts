import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { ScheduleProvider, Item } from '../../providers/schedule/schedule';

@Component({
  selector: 'page-new-schedule',
  templateUrl: 'new-schedule.html',
})
export class NewSchedulePage {

  times: string;
  theDate: Date;
  limDate: string;
  color: string;

  constructor(
    public viewCtrl: ViewController,
    private scheduleProv: ScheduleProvider,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.limitDateTime();
    let time = new Date();
    this.times = time.toString();
  }

  pickColor(color: string, name: string) {
    this.isValid(`Your pick is ${name}`);
    return this.color = color;
  }

  addZero(num: number) {
    if (num.toString().length === 1) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  limitDateTime() {
    const theDate = new Date();
    const year = theDate.getUTCFullYear();
    const month = theDate.getUTCMonth() + 1;
    const date = theDate.getDate();
    const monthzero = this.addZero(month);
    const datezero = this.addZero(date);

    return this.limDate = `${year}-${monthzero}-${datezero}`;
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

  getTheDate() {
    this.theDate = new Date();
  }

  getTheId() {
    this.getTheDate();
    return Math.floor(Math.random() * this.theDate.getTime()).toString();
  }

  onCreateSchedule(e) {
    if (!e.valid) return;
    let hash = Md5.hashStr(this.times);
    const getId = this.getTheId();
    const data: Item = e.value;
    this.getWeekDay(data.date);

    if (data.title === '' || data.title === null) {
      return this.isValid('Please add a Title');
    }

    if (data.body === '' || data.body === null) {
      return this.isValid('Please add a Description');
    }

    if (data.date === '' || data.date === null) {
      return this.isValid('Please add a Date');
    }

    if (data.time === '' || data.time === null) {
      return this.isValid('Please add a Time');
    }

    if (this.color === '' || this.color === null) {
      return this.isValid('Please add a Color');
    }

    const newData = {
      id: hash,
      title: data.title,
      body: data.body,
      date: data.date,
      time: data.time,
      color: this.color,
      isArchive: false,
      isDone: false
    }

    this.scheduleProv.addSchedule(newData)
    return this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  isValid(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    return toast.present();
  }

}
