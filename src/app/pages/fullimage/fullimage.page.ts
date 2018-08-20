import { Component, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fullimage',
  templateUrl: './fullimage.page.html',
  styleUrls: ['./fullimage.page.scss'],
})
export class FullimagePage implements OnInit {
	pic:any;
	id;
	show:boolean=true;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute,public navCtrl:NavController){
		_Activatedroute.params.subscribe(params => {this.id = params['id'];});
		this.photosProvider.getPhoto(this.id).then(photo=>{
			this.pic = photo;
		});
	}

	downloadthis=()=>{
		this.photosProvider.download(this.id);
	}

	display=()=>{
		this.show=!this.show;
	}

	ngOnInit(){

	}


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

