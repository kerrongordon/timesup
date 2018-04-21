import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {

  }

  addNewSchedule() {
    let newScMod = this.modalCtrl.create(NewSchedulePage);
    return newScMod.present();
  }

}
