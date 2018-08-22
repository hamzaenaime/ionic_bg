import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { HistoryProvider } from "./providers/history";

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
    }
  ];
  year: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public history: HistoryProvider
  ) {
    this.initializeApp();
    //this.history.history.push("/");
    this.year = new Date().getFullYear().toString();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goTo = url => {
    //console.log(this.history.history);
    this.history.history.unshift(url);
    this.navCtrl.goForward(url);
  };

  goBack = () => {
    // console.log(this.history.history);
    const url = this.history.history;
    this.history.history.shift();
    this.navCtrl.goBack(url);
  };
}
