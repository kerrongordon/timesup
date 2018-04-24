import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ScheduleItemComponent } from './schedule-item';

@NgModule({
	declarations: [ScheduleItemComponent],
	imports: [IonicModule],
	exports: [ScheduleItemComponent]
})
export class ScheduleItemModule {}
