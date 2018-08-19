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

	getPhotos = (page,type)=>{
		//return this.unsplash.photos.listPhotos(page, 15, "")
		return this.unsplash.photos.listPhotos(page, 15, type)
			  .then(res=>res.json());
			  //.then(json =>console.log(json));
	}
	getPhoto = (id)=>{
		return this.unsplash.photos.getPhoto(id)
		  .then(res=>res.json());
	}
	getCollection = (id,page)=>{
		return this.unsplash.collections.getCollectionPhotos(id, page, 10, "popular")
		  .then(res=>res.json());
	}
	getCollectionInfo=(id)=>{
		return this.unsplash.collections.getCollection(id)
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
	searchByName=(name,page)=>{
		return this.unsplash.search.photos(name, page)
		  .then(res=>res.json());
	}
	searchByCollection=(name,page)=>{
		return this.unsplash.search.collections(name, page)
		  .then(res=>res.json());
	}

	getCollections=(page)=>{
		return this.unsplash.collections.listCollections(page, 10, "popular")
		  .then(res=>res.json());
	}
	getProfile=(username)=>{
		return this.unsplash.users.profile(username)
		  .then(res=>res.json());
	}

	getUserPhotos=(username,page)=>{
		return this.unsplash.users.photos(username,page, 10, "latest")
		  .then(res=>res.json());
	}
}
