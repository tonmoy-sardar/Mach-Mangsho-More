import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the OrdersuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordersuccess',
  templateUrl: 'ordersuccess.html',
})
export class OrdersuccessPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    ) {
      events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
  }

  ionViewDidLoad() {
  }

}
