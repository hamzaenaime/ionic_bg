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
	update_at:string;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute){
		_Activatedroute.params.subscribe(params => this.id = params['id']);
		this.photosProvider.getPhoto(this.id).then(photo=>{
			this.pic = photo;
			this.update_at=new Date(this.pic.updated_at).toString().slice(0,16);
			console.log(this.pic);	
		});
	}

	downloadthis=()=>{
		this.photosProvider.download(this.id);
	}


	ngOnInit(){

	}
}
