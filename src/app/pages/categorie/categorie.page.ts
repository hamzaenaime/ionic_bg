import { Component, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})


export class CategoriePage implements OnInit {
	photos:any;
	info:any;
	id;
	page;
	date:string;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute){
		this.page=1;
		_Activatedroute.params.subscribe(params => this.id = params['id']);
		this.photosProvider.getCollection(this.id,this.page).then(photos=>{
			this.photos = photos;	
		});
		this.photosProvider.getCollectionInfo(this.id).then(info=>{console.log(info);this.info=info
		this.date=new Date(this.info.published_at).toString().slice(0,24);
		});
	}

	ngOnInit(){

	}
	clickButton=()=>{
		this.page++;
		this.photosProvider.getCollection(this.id,this.page).then(photos=>{
			this.photos = [...this.photos,...photos];
		});
	}
}
