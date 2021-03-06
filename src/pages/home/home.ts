import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, IonicPage, Platform, AlertController } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { Schedule, Item } from '../../interface/Schedule';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Subscription } from 'rxjs/Subscription';

@IonicPage({
  name: 'HomePage',
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  searchInput: any;
  deleteId: any;
  notify: Subscription;
  data: Schedule[];
  shouldShowCancel = true;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private scheduleProv: ScheduleProvider,
    private plt: Platform,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
  ) { }

  ngOnInit() {
    this.loadData();
    this.getNotifData();
  }

  onOpen(event) {
    return this.navCtrl.push('OpenSchedulePage', { data: event });
  }

  willDelete(event) {
    return this.scheduleProv.removeSchedule(event);
  }

  private getNotifData() {
    return this.plt.ready().then(() => {
      if (this.plt.is('cordova')) {
        this.notify = this.localNotifications.on('click').subscribe((data) => {
          return this.navCtrl.push('OpenSchedulePage', { data: data.data.info });
        });
      }
    });
  }

  onSearch($event) {
    this.scheduleProv.cast.subscribe(data => {
      if (data === null) return;
      const searchOutput = data.filter((search) => {
        return search.title.match(this.searchInput) || search.body.match(this.searchInput);
      });
      return this.dataFilter(searchOutput);
    });

  }

  addNewSchedule() {
    return this.modalCtrl.create('NewSchedulePage').present();
  }

  private loadData() {
    return this.scheduleProv.cast.subscribe(data => {
      if (data === null) return;
      return this.dataFilter(data);
    });
  }

  private dataFilter(data: Item[]) {
    const groups = data.reduce((groups, item) => {
      groups[item.date] ? [] : groups[item.date] = [];
      groups[item.date].push(item);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return { date, items: groups[date] };
    });

    return this.data = groupArrays.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  killNotify() {
    return this.plt.ready().then(() => this.notify === undefined ? undefined : this.notify.unsubscribe());
  }

  onDelete(event) {
    const alertCtrl = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: `Are you sure you what to delete ${event.title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { event.slidingItem.close() }
        },
        {
          text: 'Delete',
          handler: () => {
            this.willDelete(event.id);
          }
        }
      ]
    });
    return alertCtrl.present();
  }

  ionViewDidLeave() {
    this.loadData().unsubscribe();
    this.killNotify();
  }

}
