import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';
import { ScheduleProvider, Item } from '../../providers/schedule/schedule';
import { ToastController } from 'ionic-angular';
import { OpenSchedulePage } from '../open-schedule/open-schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  isArchive: boolean;
  data: { date: string; items: Item; }[];
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
    return this.scheduleProv.getSchedule().then(data => {

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

      console.log('groupArrays ', groupArrays);

      return this.data = groupArrays.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    });
  }

  addNewSchedule() {
    let newScMod = this.modalCtrl.create(NewSchedulePage);
    newScMod.onDidDismiss(() => this.loadData());
    newScMod.present();
  }

  openItem(id: string) {
    return this.navCtrl.push(OpenSchedulePage, {id: id});
  }

  deleteItem(id: string) {
    return this.scheduleProv.removeSchedule(id)
      .then(() => this.loadData())
      .then(() => this.presentToast('Schedule to Deleted'));
  }

  acrhiveItem(id: string) {
    return this.scheduleProv.archiveSchedule(id)
      .then(() => this.loadData())
      .then(() => this.presentToast('Added to Acrhive'));
  }

  restoreItem(id: string) {
    return this.scheduleProv.restoreItemSchedule(id)
      .then(() => this.loadData())
      .then(() => this.presentToast('Restore from Acrhive'));
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
