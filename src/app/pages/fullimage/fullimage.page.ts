import { Component, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fullimage',
  templateUrl: './fullimage.page.html',
  styleUrls: ['./fullimage.page.scss'],
})
export class FullimagePage implements OnInit {
	pic:any;
	id;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute){
		_Activatedroute.params.subscribe(params => {this.id = params['id'];});
		this.photosProvider.getPhoto(this.id).then(photo=>{
			this.pic = photo;
		});
	}

	downloadthis=()=>{
		this.photosProvider.download(this.id);
	}

	ngOnInit(){

	}
}
