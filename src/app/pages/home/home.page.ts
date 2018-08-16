import { Component } from '@angular/core';
import { PhotosProvider } from '../../providers/photos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	constructor(private photosProvider:PhotosProvider){}
}
