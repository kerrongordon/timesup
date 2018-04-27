import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HeaderColor } from '@ionic-native/header-color';
import { BackgroundMode } from '@ionic-native/background-mode';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { ScheduleProvider } from '../providers/schedule/schedule';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'timesup',
      storeName: 'timesupDB',
      driverOrder: ['sqlite', 'indexeddb', 'websql'],
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScheduleProvider,
    LocalNotifications,
    HeaderColor,
    BackgroundMode
  ]
})
export class AppModule {}
