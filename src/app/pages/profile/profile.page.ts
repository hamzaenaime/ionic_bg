import { Component, OnInit,ViewChild } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	 @ViewChild('scroll') scroll: any;
	profile:any;
	username:string;
	back_id:string;
	user_photos:any;
	page;
	more:boolean;
	pages;
	update_at;
	scroll_fab:boolean;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute){
		this.more=true;
		this.scroll_fab=false;
		this.page=1;
		_Activatedroute.params.subscribe(params => {
			this.username = params['username'];
			this.back_id = params['id'];
		});
		this.photosProvider.getProfile(this.username).then(profile=>{
			this.profile = profile;
			this.pages=profile.total_photos/10;
		});
		this.photosProvider.getUserPhotos(this.username,this.page).then(photos=>{
			this.user_photos=photos;
		});
	}
	clickButton=()=>{
		if(this.page>this.pages-1){this.more=false;}
		this.page++;
		this.photosProvider.getUserPhotos(this.username,this.page).then(photos=>{
			this.user_photos=[...this.user_photos,...photos];;
		});
	}

	toDate=(date)=>{
		this.update_at=new Date(date).toString().slice(0,16);
		return this.update_at;
	}

    ngOnInit() {}
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
