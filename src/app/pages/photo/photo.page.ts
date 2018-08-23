import { Component, OnInit } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";
import { ActivatedRoute } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Platform } from "@ionic/angular";

import { PhotoLibrary } from "@ionic-native/photo-library/ngx";

import { HistoryProvider } from "../../providers/history";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.page.html",
  styleUrls: ["./photo.page.scss"]
})
export class PhotoPage implements OnInit {
  pic: any;
  id;
  update_at: string;
  storage;
  cordova: boolean;
  constructor(
    private photosProvider: PhotosProvider,
    private _Activatedroute: ActivatedRoute,
    public navCtrl: NavController,
    public toastController: ToastController,
    public history: HistoryProvider,
    private socialSharing: SocialSharing,
    public platform: Platform,
    private photoLibrary: PhotoLibrary
  ) {
    _Activatedroute.params.subscribe(params => (this.id = params["id"]));
    this.photosProvider.getPhoto(this.id).then(photo => {
      this.pic = photo;
      this.update_at = new Date(this.pic.updated_at).toString().slice(0, 16);
      //console.log(this.pic);
    });
    this.storage = window.localStorage;
    //console.log(this.socialSharing);
    this.cordova = this.platform.is("cordova");
    //console.log(this.platform);
  }

  downloadthis = url => {
    /*
    this.platform.ready().then(() => {
      console.log("platform ready ");
      if (this.platform.is("cordova")) {
        console.log("platform cordova ");
        //this.photosProvider.download(this.id);
        this.photoLibrary
          .saveImage(url, "downloads")
          .then(() => console.log("download"))
          .catch(err => console.log(err));
      }
    });*/
  };

  shareWhatsapp = () => {
    /* this.socialSharing
      .share("hello instagram", null, null, null)
      .then(() => console.log("works"))
      .catch(err => console.log(err));*/
  };
  ngOnInit() {}

  goTo = url => {
    // console.log(this.history.history);
    this.history.history.unshift(url);
    this.navCtrl.goForward(url);
  };

  goBack = () => {
    // console.log(this.history.history);
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
