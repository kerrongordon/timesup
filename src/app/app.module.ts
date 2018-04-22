import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { NewSchedulePage } from '../pages/new-schedule/new-schedule';
import { ScheduleProvider } from '../providers/schedule/schedule';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewSchedulePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'timesup',
      driverOrder: ['websql', 'sqlite', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewSchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScheduleProvider
  ]
})
export class AppModule {}
