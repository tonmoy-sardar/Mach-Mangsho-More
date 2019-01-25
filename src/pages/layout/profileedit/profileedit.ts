import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';

/**
 * Generated class for the ProfileeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileedit',
  templateUrl: 'profileedit.html',
})
export class ProfileeditPage {
  userName:string;
  imageBaseUrl:any;
  userImage:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl:MenuController
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false,isSubHeaderHidden: false}); 
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userName = localStorage.getItem('userName');
    this.userImage = localStorage.getItem('userImage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileeditPage');
    this.menuCtrl.close();
  }

}
