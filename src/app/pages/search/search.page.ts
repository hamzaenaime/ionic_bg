
import { Component, OnInit } from '@angular/core';
import { Content } from '@ionic/angular';
import { PhotosProvider } from '../../providers/photos';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
	pics:any;
	page;
	name;

	constructor(private photosProvider:PhotosProvider){
		this.page=1;
	}
	ngOnInit(){}
  
  search=(name)=>{
  	this.name=name;
		this.photosProvider.searchByName(name,this.page).then(photos=>{
			//this.pics = [...this.pics,...photos];
			this.pics = photos.results;
		});
		console.log(this.name);
	}
	clickButton=()=>{
		this.page++;
		this.photosProvider.searchByName(this.name,this.page).then(photos=>{
			//this.pics = [...this.pics,...photos];
			this.pics = [...this.pics,...photos.results];
			console.log(this.pics,this.page);
		});
	}
	logScrolling =(event)=>{
		console.log (window);
	}
}

