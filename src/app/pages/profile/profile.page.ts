import { Component, OnInit } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	profile:any;
	//id;
	constructor(private photosProvider:PhotosProvider,private _Activatedroute:ActivatedRoute){
		//_Activatedroute.params.subscribe(params => this.id = params['id']);
		this.photosProvider.getProfile().then(profile=>{
			this.profile = profile;
			console.log(this.profile);	
		});
	}

    ngOnInit() {}
}
