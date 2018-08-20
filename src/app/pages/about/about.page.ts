import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
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
