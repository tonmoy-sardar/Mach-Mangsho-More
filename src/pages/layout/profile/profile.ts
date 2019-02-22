import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {environment} from '../../../core/global';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loggedIn:boolean;
  userName:string;
  imageBaseUrl:any;
  userImage:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events
    ) {
      //Header Show Hide Code 
      events.publish('hideHeader', { isHeaderHidden: false,isSubHeaderHidden: false}); 
 
      this.imageBaseUrl = environment.imageBaseUrl;
      // this.userName = localStorage.getItem('userName');
      // this.userImage = localStorage.getItem('userImage');
      if (localStorage.getItem('isLoggedin')) {
        this.loggedIn = true;
        this.userName = localStorage.getItem('userName');
        this.userImage = localStorage.getItem('userImage');
      }
      else {
        this.loggedIn = false;
        this.userName = 'Guest';
        this.userImage = '';
      }
      
  }
  ionViewDidLoad() {
  }
  gotoPage(page) {
    this.navCtrl.push(page);
  }

}
