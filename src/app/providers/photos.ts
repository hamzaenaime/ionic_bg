import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import Unsplash from 'unsplash-js';

//import 'rxjs/add/operator/map';


@Injectable()
export class PhotosProvider {
	unsplash:Unsplash;

	constructor(public http:Http) {
	  	this.unsplash = new Unsplash({
		  applicationId: "7cb8f3685196c7b1bb4de9332e0a92055d42a39ee2bfbec6d610e76452f3724f",
		  secret: "dfde93ed4e86f61080d2f1bbeab35112f86426555c2c05dc9830d63eec0568bf",
		  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
		});		
	}

	getPhotos = (page)=>{
		return this.unsplash.photos.listPhotos(page, 15, "latest")
			  .then(res=>res.json());
			  //.then(json =>console.log(json));
	}
	getPhoto = (id)=>{
		return this.unsplash.photos.getPhoto(id)
		  .then(res=>res.json());
	}
	download=(id)=>{
		this.unsplash.photos.getPhoto(id)
		  .then(res=>res.json())
		  .then(json => {
		    this.unsplash.photos.downloadPhoto(json);
		    console.log("photo downloaded...");
		  });
	}
}
