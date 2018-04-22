import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';
import { ScheduleProvider, Item } from '../../providers/schedule/schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  data: { date: string; items: Item; }[];
  color = '#555';

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private scheduleProv: ScheduleProvider
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

      this.data = groupArrays.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    });
  }

  addNewSchedule() {
    let newScMod = this.modalCtrl.create(NewSchedulePage);
    newScMod.onDidDismiss(() => this.loadData());
    newScMod.present();
  }

  openItem() {
    console.log('item open');
  }

  deleteItem() {
    console.log('item remove');
  }

  acrhiveItem() {
    console.log('item archive');
  }

}
