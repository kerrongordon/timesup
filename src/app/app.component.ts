import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;
  color: string = '#f9c440';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    headerColor: HeaderColor,
    storage: Storage
  ) {
    storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => hasSeenTutorial ? this.rootPage = 'HomePage' : this.rootPage = 'TutorialPage');
    platform.ready().then(() => {
      if (platform.is('cordova')) {
        statusBar.styleDefault();
        statusBar.backgroundColorByHexString(this.color);
        headerColor.tint(this.color);
        splashScreen.hide();
      }
    });
  }
}

