import { Component, Input } from '@angular/core';
import { Item } from '../../interface/Schedule';
import { NavController, AlertController } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';

@Component({
  selector: 'schedule-item',
  templateUrl: 'schedule-item.html'
})
export class ScheduleItemComponent {

  @Input() date: string;
  @Input() items: Item

  constructor(
    public navCtrl: NavController,
    private scheduleProv: ScheduleProvider,
    private alertCtrl: AlertController
  ) {

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

  openItemPage(id: string) {
    return this.navCtrl.push('OpenSchedulePage', {id:id});
  }

  deleteItem(id: string) {
    return this.scheduleProv.removeSchedule(id);
  }

}
