import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenSchedulePage } from './open-schedule';

@NgModule({
  declarations: [
    OpenSchedulePage
  ],
  imports: [
    IonicPageModule.forChild(OpenSchedulePage),
  ],
})
export class OpenSchedulePageModule {}
