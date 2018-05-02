import { Component } from '@angular/core';
import { NavParams, IonicPage, AlertController, NavController } from 'ionic-angular';
import { Item } from '../../interface/Schedule';
import * as moment from 'moment';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-open-schedule',
  templateUrl: 'open-schedule.html',
  animations: [
    trigger('explainerAnim', [
      transition('* => *', [
        query('.anim', style({ opacity: 0, transform: 'translateY(20px)' })),
        query('.animt', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('.anim', stagger('300ms', [
          animate('600ms .5s ease', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),
        query('.animt', stagger('300ms', [
          animate('500ms 0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        // query('.anim', [
        //   animate(1000, style('*'))
        // ])

      ])
    ])
  ]
})
export class OpenSchedulePage  {

  imageTimebk: string;
  imageTime: string;
  greeting: any;
  timerEv: number;
  data: Item;
  date: string;
  endof: string;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private scheduleProv: ScheduleProvider,
  ) {
    this.data = this.navParams.data.data
  }

  ionViewDidLoad() {
    this.getDate();
    !this.data ? this.navCtrl.push('HomePage') : null;
    this.timer();
    this.greeting = this.getGreetingTime(moment());
    this.imageTime = `assets/imgs/${this.greeting}.jpg`
    this.imageTimebk = `url(assets/imgs/${this.greeting}-blur.jpg) 50% 50% / cover`
  }

  timer() {
    return this.timerEv = setInterval(() => { this.getDate()}, 1000);
  }

  getDate() {
    if (!this.data) return;
    this.date = moment(this.data.date).format('dddd MMMM Do YYYY');
    return this.endof = moment(`${this.data.date}T${this.data.time}`).endOf('minute').fromNow();
  }

  willDelete(id: string) {
    return this.scheduleProv.removeSchedule(id);
  }

  getGreetingTime (m) {
	var g = null; //return g
	
	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
	
	var split_afternoon = 12 //24hr time to split the afternoon
	var split_evening = 17 //24hr time to split the evening
	var currentHour = parseFloat(m.format("HH"));
	
	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		g = "afternoon";
	} else if(currentHour >= split_evening) {
		g = "evening";
	} else {
		g = "morning";
	}
	return g;
}

  deleteItem(event) {
    const alertCtrl = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: `Are you sure you what to delete ${event.title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.willDelete(event.id).then(() => this.navCtrl.pop());
          }
        }
      ]
    });
    return alertCtrl.present();
  }

  ionViewDidLeave(){
    clearInterval(this.timerEv);
  }

}
