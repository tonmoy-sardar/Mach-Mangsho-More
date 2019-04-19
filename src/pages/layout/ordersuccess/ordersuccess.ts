import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the OrdersuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage({ segment: 'ordersuccess/:id' })
@IonicPage()
@Component({
  selector: 'page-ordersuccess',
  templateUrl: 'ordersuccess.html',
})
export class OrdersuccessPage {
  orderId:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
  ) {
    this.orderId = this.navParams.get('id');
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false, backButtonHidden: true }); // For Show- hide Header

    setTimeout(() => {
      //this.navCtrl.setRoot(page);
      //this.navCtrl.push('OrderhistoryPage');
      this.navCtrl.push('OrderdetailsPage',{id:this.orderId});
    }, 3000);
  }

  ionViewDidLoad() {
  }

}
