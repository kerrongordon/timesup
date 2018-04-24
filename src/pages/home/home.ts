import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { ToastController } from 'ionic-angular';
import { Schedule } from '../../interface/Schedule';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit, OnDestroy{

  isArchive: boolean;
  data: Schedule[];
  color: string;
  tabButton: string = 'schedule';

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private scheduleProv: ScheduleProvider,
    public toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    return this.scheduleProv.cast.subscribe(data => {
      if (data === null ) return;

      const groups = data.reduce((groups, item) => {
        const date = item.date;
        if (!groups[date]) { groups[date] = []; }
        groups[date].push(item);
        return groups;
      }, {});

      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          items: groups[date]
        };
      });

      return this.data = groupArrays.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    });
  }

  addNewSchedule() {
    let newScMod = this.modalCtrl.create('NewSchedulePage');
    newScMod.present();
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ngOnDestroy() {
    this.loadData().unsubscribe();
  }

}
