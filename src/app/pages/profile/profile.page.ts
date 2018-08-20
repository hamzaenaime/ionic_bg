import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	@ViewChild('scroll') scroll: any;
	profile: any;
	username: string;
	user_photos: any;
	page;
	more: boolean;
	pages;
	update_at;
	scroll_fab: boolean;
	constructor(private photosProvider: PhotosProvider, private _Activatedroute: ActivatedRoute, public navCtrl: NavController) {
		this.more = true;
		this.scroll_fab = false;
		this.page = 1;
		_Activatedroute.params.subscribe(params => {
			this.username = params['username'];
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
		if (this.page > this.pages - 1) { this.more = false; }
		this.page++;
		this.photosProvider.getUserPhotos(this.username, this.page).then(photos => {
			this.user_photos = [...this.user_photos, ...photos];;
		});
	}

	toDate = (date) => {
		this.update_at = new Date(date).toString().slice(0, 16);
		return this.update_at;
	}

	ngOnInit() { }
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
		this.navCtrl.stack.pop();
		this.navCtrl.stack.pop();
		console.log(this.navCtrl.stack);
		this.navCtrl.goBack(this.navCtrl.stack[this.navCtrl.stack.length - 1]);
	}
}
