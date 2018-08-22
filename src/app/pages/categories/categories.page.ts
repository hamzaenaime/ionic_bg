import { Component, OnInit, ViewChild } from "@angular/core";
import { PhotosProvider } from "../../providers/photos";
import { NavController } from "@ionic/angular";

import { HistoryProvider } from "../../providers/history";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"]
})
export class CategoriesPage implements OnInit {
  @ViewChild("scroll")
  scroll: any;
  categories: any;
  page;
  pageS;
  name;
  searching: boolean;
  scroll_fab: boolean;
  show_search: boolean;

  constructor(
    private photosProvider: PhotosProvider,
    public navCtrl: NavController,
    public history: HistoryProvider
  ) {
    //console.log(window.localStorage);
    this.scroll_fab = false;
    this.searching = false;
    this.show_search = false;
    this.page = 1;
    this.pageS = 1;
    this.photosProvider.getCollections(this.page).then(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }
  ngOnInit() {}
  clickButton = () => {
    this.page++;
    this.photosProvider.getCollections(this.page).then(categories => {
      this.categories = [...this.categories, ...categories];
    });
  };
  search = name => {
    this.searching = true;
    if (name === "") {
      this.searching = false;
      this.page = 1;
      this.photosProvider.getCollections(this.page).then(categories => {
        this.categories = categories;
      });
      return;
    }
    this.name = name;
    this.photosProvider.searchByCollection(name, this.page).then(categories => {
      //this.pics = [...this.pics,...photos];
      this.categories = categories.results;
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
    // console.log(this.history.history);
    const url = this.history.history[0];
    this.history.history.shift();
    this.navCtrl.goBack(url);
  };
  clickSearch = () => {
    this.show_search = true;
    setTimeout(() => (this.show_search = false), 10000);
  };
}
