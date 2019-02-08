import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  rating: number = 4;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }

  gotoreviewPage() {
    this.navCtrl.push('ReviewPage');
  }

}
