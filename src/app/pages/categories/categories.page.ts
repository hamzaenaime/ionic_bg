import { Component, OnInit,ViewChild } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
	 @ViewChild('scroll') scroll: any;
	categories:any;
	page;
	pageS;
	name;
	searching:boolean;
	scroll_fab:boolean;

	constructor(private photosProvider:PhotosProvider){
		this.scroll_fab=false;
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
	scrollToTop=()=> {
	   	this.scroll.nativeElement.scrollTop=0;
	}
	log(){
		if(this.scroll.nativeElement.scrollTop>=1000){
			this.scroll_fab=true;
		}else{
			this.scroll_fab=false;
		}
	}
	logScrollEnd(){this.log();}
	logScrollStart(){this.log();}
}