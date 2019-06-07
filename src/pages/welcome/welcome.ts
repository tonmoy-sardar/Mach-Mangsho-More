import { Component,ViewChild } from '@angular/core';
import { IonicPage,Slides, NavController, MenuController, NavParams,Events } from 'ionic-angular';
import { environment } from '../../core/global';



/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  categoryList: any = [];
  imageBaseUrl: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
  ) {
    events.publish('hideHeader', { isHeaderHidden: true, isSubHeaderHidden: true,backButtonHidden:true }); // For Show- hide Header
    this.imageBaseUrl = environment.imageBaseUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.menuCtrl.close();
  }

  gotoPage(page) {
    this.navCtrl.push(page);
  }
 

 

}
