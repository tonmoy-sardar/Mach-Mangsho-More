import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  isShowHeader:number;
  isShow:number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events
    ) {
    this.isShow =0;
      //Header Show Hide Code 
      events.publish('hideHeader', { isHeaderHidden: true,isSubHeaderHidden: true}); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
    
  }
  gotoSignin() {
    this.navCtrl.push('LoginPage');
  }
  resetPassword() {
    this.isShow =1;
  }
 

}
