import { Component, OnDestroy } from '@angular/core';
import { ViewController, ToastController, IonicPage, Platform } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { Item, InputData } from '../../interface/Schedule';
import { LocalNotifications } from '@ionic-native/local-notifications';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-new-schedule',
  templateUrl: 'new-schedule.html',
})
export class NewSchedulePage implements OnDestroy {

  timer: number;
  times: string;
  limDate: string;
  color: string = '#3689e6';

  constructor(
    public viewCtrl: ViewController,
    private scheduleProv: ScheduleProvider,
    private toastCtrl: ToastController,
    private localNotifications: LocalNotifications,
    private plt: Platform
  ) {}

  ionViewDidLoad() {
    this.limitDateTime();
  }

  pickColor(color: string) {
    return this.color = color;
  }

  stopTimer() {
    return clearInterval(this.timer)
  }

  limitDateTime() {
    return this.limDate = moment().format('YYYY-MM-DD');
  }
 
  notifi(id:string | Int32Array, title:string, time:string ) {
      if (this.plt.is('cordova')) {
        const toDate = new Date(time);
        const idToNub = Number(id);
        return this.localNotifications.schedule({
          id: idToNub,
          text: title,
          sound: this.plt.is('android') ? 'file://assets/sound/sound.mp3' : 'file://assets/sound/sound.caf',
          icon: 'file://assets/imgs/logo.png',
          trigger: { at: toDate },
          data: { id: id }
        });
      }
  }

  onCreateSchedule(e) {
    const data: InputData = e.value;
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

    if (!e.valid) return;
    const hash = Md5.hashStr( moment().format() );
    const getTime = data.time;
    const geth = parseInt(getTime.substring(0,2));
    const getm = parseInt(getTime.substring(3,5));
    const addDate = moment().format();
    const setDate = moment(data.date).hour(geth).minute(getm).format();

    const newData:Item = {
      id: hash,
      title: data.title,
      body: data.body,
      date: data.date,
      time: data.time,
      color: data.color === '' ? this.color : data.color,
      isArchive: false,
      isDone: false,
      dateAdded: addDate,
      dateSet: setDate
    }

    this.notifi(hash, data.title, setDate);
    this.scheduleProv.addSchedule(newData);
    return this.dismiss()
      .then(() => this.isValid('New Schedule Added'));
  }

  dismiss() {
    return this.viewCtrl.dismiss();
  }

  isValid(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    return toast.present();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

}
