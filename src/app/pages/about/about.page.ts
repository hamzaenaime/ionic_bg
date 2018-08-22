import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

import { HistoryProvider } from "../../providers/history";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"]
})
export class AboutPage implements OnInit {
  constructor(public navCtrl: NavController, public history: HistoryProvider) {}

  ngOnInit() {}

  goTo = url => {
    //console.log(this.history.history);
    this.history.history.unshift(url);
    this.navCtrl.goForward(url);
  };

  goBack = () => {
    //console.log(this.history.history);
    const url = this.history.history;
    this.history.history.shift();
    this.navCtrl.goBack(url);
  };
}
