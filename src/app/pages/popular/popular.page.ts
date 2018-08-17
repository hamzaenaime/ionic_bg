import { Component, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {
	pics:any;
	page;
	constructor(private photosProvider:PhotosProvider){
		this.page=1;
		this.photosProvider.getPhotos(this.page,"popular").then(photos=>{
			this.pics = photos;
		});
	}
	clickButton=()=>{
		this.page++;
		this.photosProvider.getPhotos(this.page,"popular").then(photos=>{
			this.pics = [...this.pics,...photos];
		});
	}
	ngOnInit(){

	}
}