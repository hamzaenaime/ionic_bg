import { Component, OnInit,ViewChild } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';

import { Content , NavController } from '@ionic/angular';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {
	pics:any;
	page;
	@ViewChild('scroll') scroll: any;
	scroll_fab:boolean;
	constructor(private photosProvider:PhotosProvider,public navCtrl:NavController){
		this.page=1;
		this.scroll_fab=false;
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

  	goTo=(url)=>{
  		console.log(url);
	    this.navCtrl.stack.push(url);
	    this.navCtrl.goForward(url);
  	}

 	goBack=()=>{
	    this.navCtrl.stack.pop();
	    this.navCtrl.stack.pop();
	    this.navCtrl.stack.pop();
 		console.log(this.navCtrl.stack);
	    this.navCtrl.goBack(this.navCtrl.stack[this.navCtrl.stack.length-1]);
  	}
}