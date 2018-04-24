import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ScheduleItemModule } from '../../components/schedule-item/schedule-item.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ScheduleItemModule,
  ],
})
export class HomePageModule {}
