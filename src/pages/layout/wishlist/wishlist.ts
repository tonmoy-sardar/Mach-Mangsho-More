import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl:MenuController
    ) {
      //Header Show Hide Code 
      events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
    this.menuCtrl.close();
  }

  gotoDetails() {
    this.navCtrl.push('ProductdetailsPage');
  }


}
