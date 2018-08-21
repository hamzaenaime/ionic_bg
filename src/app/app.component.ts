import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/",
      icon: "home"
    },
    {
      title: "Latest Pics",
      url: "/latest",
      icon: "time"
    },
    {
      title: "Popular",
      url: "/popular",
      icon: "star"
    },
    {
      title: "Categories",
      url: "/categories",
      icon: "filing"
    },
    {
      title: "About",
      url: "/about",
      icon: "information"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.initializeApp();
    this.navCtrl.stack.push(this.appPages[0].url);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goTo = url => {
    this.navCtrl.stack.push(url);
    this.navCtrl.goForward(url);
  };

  goBack = () => {
    this.navCtrl.stack.pop();
    this.navCtrl.goBack(this.navCtrl.stack[this.navCtrl.stack.length - 1]);
  };
}
