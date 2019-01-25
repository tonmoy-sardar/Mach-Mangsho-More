import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  showCat:number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl:MenuController
    ) {
    this.showCat=1; 
    events.publish('hideHeader', { isHeaderHidden: false,isSubHeaderHidden: false}); // For Show- hide Header
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.menuCtrl.close();
  }

  moreCategory() {
    this.showCat=2;
  }

  lessCategory() {
    this.showCat=1;
  }

  goToProList() {
    this.navCtrl.push('ProductlistPage');
  }
 
}
