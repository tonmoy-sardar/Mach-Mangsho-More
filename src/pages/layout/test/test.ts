
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as $ from "jquery";

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var jQuery: any;
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  
  items = [];
  a :number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private socialSharing: SocialSharing
    ) {
      this.a =1;
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }
  }

  ionViewDidLoad() {
   
  }

  doInfinite(infiniteScroll) {
    this.a =this.a+1;
    console.log(this.a);
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  
}
