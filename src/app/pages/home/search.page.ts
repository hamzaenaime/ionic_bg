
import { Component, OnInit ,ViewChild } from '@angular/core';
import { Content , NavController } from '@ionic/angular';
import { PhotosProvider } from '../../providers/photos';

import { PopularPage } from '../popular/popular.page';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
	 @ViewChild('scroll') scroll: any;
	pics:any;
	page:number;
	name:string;
	searching:boolean;
	scroll_fab:boolean;
	constructor(private photosProvider:PhotosProvider,public navCtrl:NavController){
		this.page=1;
		this.scroll_fab=false;
		
	}
	ngOnInit(){
	}
  
  search=(name)=>{
  	if(name){
  		this.searching=true;
  	}else{
  		this.searching=false;
  	}
  	this.name=name;
		this.photosProvider.searchByName(name,this.page).then(photos=>{
			//this.pics = [...this.pics,...photos];
			this.pics = photos.results;
		});
	}
	clickButton=()=>{
		this.page++;
		this.photosProvider.searchByName(this.name,this.page).then(photos=>{
			this.pics = [...this.pics,...photos.results];
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

