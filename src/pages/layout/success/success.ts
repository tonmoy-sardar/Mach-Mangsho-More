import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

/**
 * Generated class for the SuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    ) {
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false,backButtonHidden:true }); // For Show- hide Header
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessPage');
  }

  ionViewDidEnter() {
    this.events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false,backButtonHidden:true }); // For Show- hide Header
  }

}
