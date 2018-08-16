import { Component, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
	pic:any;
	id;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute){
		_Activatedroute.params.subscribe(params => this.id = params['id']);
		this.photosProvider.getPhoto(this.id).then(photo=>{
			this.pic = photo;
			console.log(this.pic);	
		});
	}

	downloadthis=()=>{
		this.photosProvider.download(this.id);
	}

	ngOnInit(){

	}
}
