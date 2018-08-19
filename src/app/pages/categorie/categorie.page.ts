import { Component, OnInit ,ViewChild } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})


export class CategoriePage implements OnInit {
	@ViewChild('scroll') scroll: any;
	photos:any;
	info:any;
	id:string;
	page;
	date:string;
	update_at;
	more:boolean;
	pages;
	scroll_fab:boolean;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute){
		this.scroll_fab=false;
		this.page=1;
		this.more=true;
		_Activatedroute.params.subscribe(params => this.id = params['id']);
		this.photosProvider.getCollection(this.id,this.page).then(photos=>{
			this.photos = photos;	
		});
		this.photosProvider.getCollectionInfo(this.id).then(info=>{
			this.info=info;
			this.date=new Date(this.info.published_at).toString().slice(0,16);
			this.pages=info.total_photos/10;
		});
	}

	ngOnInit(){

	}
	toDate=(date)=>{
		this.update_at=new Date(date).toString().slice(0,16);
		return this.update_at;
	}

	clickButton=()=>{
		if(this.page>this.pages-1){this.more=false;}
		this.page++;
		this.photosProvider.getCollection(this.id,this.page).then(photos=>{
			this.photos = [...this.photos,...photos];
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
