import { Component, ViewChild, OnInit } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";

import { NavController } from "@ionic/angular";

import { HistoryProvider } from "../../providers/history";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public components = [
    {
      title: "Popular",
      class: "cols",
      open: false
    },
    {
      title: "Latest",
      class: "cols",
      open: false
    },
    {
      title: "Categories",
      class: "cols",
      open: false
    },
    {
      title: "Favorites",
      class: "cols",
      open: false
    }
  ];
  label: string;
  favorites: any;
  @ViewChild("scroll")
  scroll: any;
  page;
  scroll_fab: boolean;
  storage: any;
  key: string;
  categories: any;
  latest: any;
  popular: any;
  slideOpts = {
    effect: "flip"
  };
  constructor(
    private photosProvider: PhotosProvider,
    public navCtrl: NavController,
    public history: HistoryProvider
  ) {
    this.label = "welcome";
    this.scroll_fab = false;
    this.favorites = [];
    this.storage = window.localStorage;
  }
  ionWillEnter() {
    this.photosProvider.getPhotos(this.page, this.label).then(photos => {
      this.popular = photos;
      // console.log(this.popular);
    });
  }
  ngOnInit() {}
  swap = title => {
    if (this.label !== title) {
      this.label = title;
      this.components.map(c => {
        if (c.title === title) {
          c.class = "current";
          c.open = true;
        } else {
          c.class = "cols";
          c.open = false;
        }
      });
      if (this.label === "Popular") {
        this.page = 1;
        this.photosProvider.getPhotos(this.page, this.label).then(photos => {
          this.popular = photos;
        });
      } else if (this.label === "Latest") {
        this.page = 1;
        this.photosProvider.getPhotos(this.page, this.label).then(photos => {
          this.latest = photos;
        });
      } else if (this.label === "Categories") {
        this.page = 1;
        this.photosProvider.getCollections(1).then(categories => {
          this.categories = categories;
          // console.log(categories);
        });
      } else {
        for (let i = 0; i < this.storage.length; i++) {
          this.key = this.storage.key(i);
          this.photosProvider
            .getPhoto(this.storage.getItem(this.key))
            .then(photo => {
              this.favorites.push(photo);
            });
        }
        //this.pics = this.favorites;
      }
    }
  };

  clickButton = () => {
    this.page++;
    //console.log(this.page);
    if (this.label === "Popular") {
      this.photosProvider.getPhotos(this.page, this.label).then(popular => {
        this.popular = [...this.popular, ...popular];
      });
    } else if (this.label === "Latest") {
      this.photosProvider.getPhotos(this.page, this.label).then(latest => {
        this.latest = [...this.latest, ...latest];
      });
    } else if (this.label === "Categories") {
      this.photosProvider.getCollections(this.page).then(categories => {
        this.categories = [...this.categories, ...categories];
      });
    }
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
