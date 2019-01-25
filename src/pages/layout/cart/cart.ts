import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';



/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events
  ) {
    events.publish('hideHeader', { isHeaderHidden: false,isSubHeaderHidden: false}); // For Show- hide Header
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  goback() {
    this.navCtrl.pop();
  }

  gotoPage() {
    this.navCtrl.push('MyaddressPage');
  }

}
