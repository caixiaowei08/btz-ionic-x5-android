import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpStorage} from '../providers/httpstorage';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';

declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private httpstorage: HttpStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#000");
      splashScreen.hide();
      //this.httpstorage.removeAll();
      httpstorage.getStorage('user', (data) => {
        if (data == null) this.rootPage = LoginPage;
        else this.rootPage = TabsPage;
      });

      if (window.JPush) window.JPush.init();
    });
  }
}
