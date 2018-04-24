import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { Item } from '../../interface/Schedule';

@IonicPage()
@Component({
  selector: 'page-open-schedule',
  templateUrl: 'open-schedule.html',
})
export class OpenSchedulePage implements OnDestroy {

  timer: number;
  data: Item;
  startTime: string = '10:15';
  endTime: string = '11:00';
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private scheduleProv: ScheduleProvider,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
   this.loadData();

   this.timer = setInterval(() => {
      let dateNow = new Date();
      let time = `${dateNow.getHours()}:${dateNow.getMinutes()}`

     if (time >= this.data.time) {
       console.log('Times Up ', this.data.time)
     }
     console.log(time);
   }, 1000);
  }

  loadData() {
    return this.scheduleProv.openSchedule(this.navParams.data.id)
      .then(data => this.data = data[0]);
  }

  deleteItem(id: string) {
    return this.scheduleProv.removeSchedule(id)
      .then(() => this.navCtrl.push('HomePage'));
  }
  
  stopTimer() {
    return clearInterval(this.timer);
  }

  ngOnDestroy() {
    this.stopTimer();
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
            this.deleteItem(id).then(() => this.stopTimer());
          }
        }
      ]
    });
    alert.present();
  }

}
