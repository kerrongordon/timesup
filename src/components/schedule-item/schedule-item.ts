import { Component, Input } from '@angular/core';
import { Item } from '../../interface/Schedule';
import { NavController, AlertController } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { ItemSliding } from 'ionic-angular';

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
  ) {}

  deleteConfirm(id: string, title: string, slidingItem: ItemSliding) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: `Are you sure you what to delete ${title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { this.cancelDelete(slidingItem) }
        },
        {
          text: 'Delete',
          handler: () => {this.deleteItem(id);}
        }
      ]
    });
    return alert.present();
  }

  cancelDelete(slidingItem: ItemSliding) {
    return slidingItem.close();
  }

  openItemPage(id: string) {
    return this.navCtrl.push('OpenSchedulePage', {id:id});
  }

  deleteItem(id: string) {
    return this.scheduleProv.removeSchedule(id);
  }

}
