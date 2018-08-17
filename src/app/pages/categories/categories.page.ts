import { Component, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
	categories:any;
	page;
	pageS;
	name;
	searching:boolean;

	constructor(private photosProvider:PhotosProvider){
		this.searching=false;
		this.page=1;
		this.pageS=1;
		this.photosProvider.getCollections(this.page).then(categories=>{
			this.categories = categories;
			console.log(this.categories);	
		});
	}
	ngOnInit(){}
	clickButton=()=>{
		this.page++;
		this.photosProvider.getCollections(this.page).then(categories=>{
			this.categories = [...this.categories,...categories];
		});
	}
	search=(name)=>{
	this.searching=true;
	if(name===""){
		this.searching=false;
		this.page=1;
		this.photosProvider.getCollections(this.page).then(categories=>{
			this.categories = categories;	
		});
		return;
	}
  	this.name=name;
		this.photosProvider.searchByCollection(name,this.page).then(categories=>{
			//this.pics = [...this.pics,...photos];
			this.categories = categories.results;
		});
	}
}