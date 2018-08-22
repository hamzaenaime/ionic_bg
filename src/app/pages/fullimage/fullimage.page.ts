import { Component, OnInit } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";

import { HistoryProvider } from "../../providers/history";

@Component({
  selector: "app-fullimage",
  templateUrl: "./fullimage.page.html",
  styleUrls: ["./fullimage.page.scss"]
})
export class FullimagePage implements OnInit {
  pic: any;
  id;
  show: boolean = true;
  constructor(
    private photosProvider: PhotosProvider,
    private _Activatedroute: ActivatedRoute,
    public navCtrl: NavController,
    public history: HistoryProvider
  ) {
    _Activatedroute.params.subscribe(params => {
      this.id = params["id"];
    });
    this.photosProvider.getPhoto(this.id).then(photo => {
      this.pic = photo;
    });
  }

  downloadthis = () => {
    this.photosProvider.download(this.id);
  };

  display = () => {
    this.show = !this.show;
  };

  ngOnInit() {}

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
