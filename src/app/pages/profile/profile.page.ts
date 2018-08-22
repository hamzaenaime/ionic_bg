import { Component, OnInit, ViewChild } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";
import { ActivatedRoute } from "@angular/router";

import { HistoryProvider } from "../../providers/history";

import { NavController, ToastController } from "@ionic/angular";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  @ViewChild("scroll")
  scroll: any;
  profile: any;
  username: string;
  user_photos: any;
  page;
  more: boolean;
  pages;
  update_at;
  scroll_fab: boolean;
  storage: any;
  constructor(
    private photosProvider: PhotosProvider,
    private _Activatedroute: ActivatedRoute,
    public navCtrl: NavController,
    public toastController: ToastController,
    public history: HistoryProvider
  ) {
    this.storage = window.localStorage;
    this.more = true;
    this.scroll_fab = false;
    this.page = 1;
    _Activatedroute.params.subscribe(params => {
      this.username = params["username"];
    });
    this.photosProvider.getProfile(this.username).then(profile => {
      this.profile = profile;
      this.pages = profile.total_photos / 10;
    });
    this.photosProvider.getUserPhotos(this.username, this.page).then(photos => {
      this.user_photos = photos;
    });
  }
  clickButton = () => {
    if (this.page > this.pages - 1) {
      this.more = false;
    }
    this.page++;
    this.photosProvider.getUserPhotos(this.username, this.page).then(photos => {
      this.user_photos = [...this.user_photos, ...photos];
    });
  };

  toDate = date => {
    this.update_at = new Date(date).toString().slice(0, 16);
    return this.update_at;
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
  liked = id => {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage.getItem(id)) {
        return true;
      }
    }
    return false;
  };
  like = id => {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage.getItem(id)) {
        this.storage.removeItem(id);
        this.presentToastWithOptions("Remove From Favorites");
        return;
      }
    }
    this.storage.setItem(id, id);
    //console.log(this.storage);
    this.presentToastWithOptions("Add To Favorites");
  };

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: "top",
      closeButtonText: "Close",
      duration: 2000
    });
    toast.present();
  }
}
