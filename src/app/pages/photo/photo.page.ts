import { Component, OnInit } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";
import { ActivatedRoute } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";

//import { PhotoLibrary } from "@ionic-native/photo-library";

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
  constructor(
    private photosProvider: PhotosProvider,
    private _Activatedroute: ActivatedRoute,
    public navCtrl: NavController,
    public toastController: ToastController //,private photoLibrary: PhotoLibrary
  ) {
    _Activatedroute.params.subscribe(params => (this.id = params["id"]));
    this.photosProvider.getPhoto(this.id).then(photo => {
      this.pic = photo;
      this.update_at = new Date(this.pic.updated_at).toString().slice(0, 16);
      console.log(this.pic);
    });
    this.storage = window.localStorage;
  }

  downloadthis = url => {
    this.photosProvider.download(this.id);
    //this.photoLibrary.saveImage(url, "downloads");
  };

  ngOnInit() {}

  goTo = url => {
    console.log(url);
    this.navCtrl.stack.push(url);
    this.navCtrl.goForward(url);
  };

  goBack = () => {
    this.navCtrl.stack.pop();
    this.navCtrl.stack.pop();
    this.navCtrl.stack.pop();
    console.log(this.navCtrl.stack);
    this.navCtrl.goBack(this.navCtrl.stack[this.navCtrl.stack.length - 1]);
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
    console.log(this.storage);
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
