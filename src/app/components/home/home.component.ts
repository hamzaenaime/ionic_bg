import { Component, ViewChild, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public components = [
    {
      title: 'Popular',
      class: 'current',
      open: true
    },
    {
      title: 'Latest',
      class: 'cols',
      open: false
    },
    {
      title: 'Favorites',
      class: 'cols',
      open: false
    }
  ];
  label: string;
  favorites: any;
  @ViewChild('scroll') scroll: any;
  pics: any;
  page;
  scroll_fab: boolean;
  storage: any;
  key: string;
  constructor(private photosProvider: PhotosProvider, public navCtrl: NavController) {
    this.label = 'popular';
    this.scroll_fab = false;
    this.favorites = [];
    this.page = 1;
    this.storage = window.localStorage;
    this.photosProvider.getPhotos(this.page, this.label).then(photos => {
      this.pics = photos;
    });
  }

  ngOnInit() {
  }
  swap = (title) => {
    this.label = title;
    this.components.map(c => {
      if (c.title === title) {
        c.class = 'current';
        c.open = true;
      } else {
        c.class = 'cols';
        c.open = false;
      }
    });
    if (this.label !== 'Favorites') {
      this.photosProvider.getPhotos(this.page, this.label).then(photos => {
        this.pics = photos;
      });
    } else {
      for (let i = 0; i < this.storage.length; i++) {
        this.key = this.storage.key(i);
        this.photosProvider.getPhoto(this.storage.getItem(this.key)).then(photo => {
          this.favorites.push(photo);
        });
      }
      this.pics = this.favorites;
    }
  }


  clickButton = () => {
    this.page++;
    this.photosProvider.getPhotos(this.page, "latest").then(photos => {
      this.pics = [...this.pics, ...photos];
    });
  }
  scrollToTop = () => {
    this.scroll.nativeElement.scrollTop = 0;
  }
  log() {
    if (this.scroll.nativeElement.scrollTop >= 1000) {
      this.scroll_fab = true;
    } else {
      this.scroll_fab = false;
    }
  }
  logScrollEnd() { this.log(); }
  logScrollStart() { this.log(); }
  goTo = (url) => {
    console.log(url);
    this.navCtrl.stack.push(url);
    this.navCtrl.goForward(url);
  }

  goBack = () => {
    this.navCtrl.stack.pop();
    this.navCtrl.goBack(this.navCtrl.stack[this.navCtrl.stack.length - 1]);
  }

}



