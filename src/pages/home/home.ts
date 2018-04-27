import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, IonicPage, Platform } from 'ionic-angular';
import { ScheduleProvider } from '../../providers/schedule/schedule';
import { Schedule, Item } from '../../interface/Schedule';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit, OnDestroy{

  data: Schedule[];
  shouldShowCancel = true;
  searchInput;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private scheduleProv: ScheduleProvider,
    private plt: Platform,
    private localNotifications: LocalNotifications,
  ) {}

  ngOnInit() {
    this.loadData();
    this.plt.is('cordova') ? this.getNotifData() : null;
  }

  private getNotifData() {
    return this.localNotifications.on('click').subscribe((data) => {
      return this.navCtrl.push('OpenSchedulePage', { id: data.data.id });
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

  onSearchCancel($event) {
    console.log($event);
  }

  addNewSchedule() {
    return this.modalCtrl.create('NewSchedulePage').present();
  }

  private loadData() {
    return this.scheduleProv.cast.subscribe(data => {
      if (data === null ) return;
      return this.dataFilter(data);
    });
  }

  private dataFilter(data:Item[]) {
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

  ngOnDestroy() {
    this.loadData().unsubscribe();
    this.getNotifData().unsubscribe();
  }

}
