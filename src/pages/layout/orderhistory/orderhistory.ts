import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the OrderhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderhistory',
  templateUrl: 'orderhistory.html',
})
export class OrderhistoryPage {

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
    
    console.log('ionViewDidLoad OrderhistoryPage');
    this.menuCtrl.close();
  }

}
