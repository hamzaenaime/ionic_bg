import { Component, ViewChild } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";

import { Content, NavController } from "@ionic/angular";

import { HistoryProvider } from "../../providers/history";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  @ViewChild("scroll")
  scroll: any;
  pics: any;
  page;
  scroll_fab: boolean;
  constructor(
    private photosProvider: PhotosProvider,
    public navCtrl: NavController,
    public history: HistoryProvider
  ) {
    this.scroll_fab = false;
    this.page = 1;
    this.photosProvider.getPhotos(this.page, "latest").then(photos => {
      this.pics = photos;
    });
  }
  clickButton = () => {
    this.page++;
    this.photosProvider.getPhotos(this.page, "latest").then(photos => {
      this.pics = [...this.pics, ...photos];
    });
  };
  scrollToTop = () => {
    this.scroll.nativeElement.scrollTop = 0;
  };
  log() {
    if (this.scroll.nativeElement.scrollTop >= 1000) {
      this.scroll_fab = true;
    } else {
      this.scroll_fab = false;
    }
  }
  logScrollEnd() {
    this.log();
  }
  logScrollStart() {
    this.log();
  }
  goTo = url => {
    //console.log(this.history.history);
    this.history.history.unshift(url);
    this.navCtrl.goForward(url);
  };

  goBack = () => {
    //console.log(this.history.history);
    const url = this.history.history[0];
    this.history.history.shift();
    this.navCtrl.goBack(url);
  };
}
