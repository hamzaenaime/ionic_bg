import { Component, OnInit, ViewChild } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";

import { Content, NavController } from "@ionic/angular";

import { HistoryProvider } from "../../providers/history";

@Component({
  selector: "app-popular",
  templateUrl: "./popular.page.html",
  styleUrls: ["./popular.page.scss"]
})
export class PopularPage implements OnInit {
  pics: any;
  page;
  @ViewChild("scroll")
  scroll: any;
  scroll_fab: boolean;
  constructor(
    private photosProvider: PhotosProvider,
    public navCtrl: NavController,
    public history: HistoryProvider
  ) {
    this.page = 1;
    this.scroll_fab = false;
    this.photosProvider.getPhotos(this.page, "popular").then(photos => {
      this.pics = photos;
    });
  }
  clickButton = () => {
    this.page++;
    this.photosProvider.getPhotos(this.page, "popular").then(photos => {
      this.pics = [...this.pics, ...photos];
    });
  };
  ngOnInit() {}
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
    this.history.history.unshift(url);
    this.navCtrl.goForward(url);
  };

  goBack = () => {
    const url = this.history.history[0];
    this.history.history.shift();
    this.navCtrl.goBack(url);
  };
}
