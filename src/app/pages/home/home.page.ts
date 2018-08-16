import { Component } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	pics:any;
	page;
	constructor(private photosProvider:PhotosProvider){
		this.page=1;
		this.photosProvider.getPhotos(this.page).then(photos=>{
			this.pics = photos;
		});
	}
	clickButton=()=>{
		this.page++;
		this.photosProvider.getPhotos(this.page).then(photos=>{
			this.pics = [...this.pics,...photos];
		});
	}
}

