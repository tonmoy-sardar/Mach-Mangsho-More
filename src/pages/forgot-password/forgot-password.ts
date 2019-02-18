import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ForgotpasswordService } from '../../core/services/forgotpassword.service';
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
  isShowHeader: number;
  isShow: number;
  data: any = {};
  newOtp: string;
  otpVerified: number;
  contactNumber: any;
  lastFourNumber: number;
  getResult: any = {};
  useContactEmail;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private toastCtrl: ToastController,
    public forgotpasswordService: ForgotpasswordService
  ) {
    this.isShow = 0;
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: true, isSubHeaderHidden: true });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
    

  }
  gotoSignin() {
    this.navCtrl.push('LoginPage');
  }
  resetPassword(data) {
    this.useContactEmail = data.contact_or_email;
   
    if (this.useContactEmail!= undefined) {
      
      this.forgotpasswordService.userForgotPassword(data).subscribe(
        res => {
          console.log("Forgot Result", res);
          this.isShow = 1;
          this.newOtp = res['result']['otp'];
          this.getResult = res['result'];
        },
        error => {
          this.presentToast("Please check your contact number");
          console.log(error);

        }
      )
    } else {
      console.log("Forgot Result");
      this.presentToast("Please check your contact number");
    }

  }

  matchOtp(data) {
    console.log(data);
    if (data != "") {
      console.log(this.newOtp);
      console.log(btoa(data.otp));
      if (this.newOtp == btoa(data.otp)) {

        this.otpVerified = 1;
        this.isShow = 2;
      }
      else {
        this.presentToast("OTP mismatch");
      }
    } else {
      this.presentToast("Please Enter OTP");
    }
  }

  updatePassword(data) {
    console.log(data);
    if (data.newpass == data.confpass) {

      data.otp_verified = 1;
      data.password = data.newpass;
      data.contact_or_email = this.useContactEmail;

      console.log("New Data==>", data);

      this.forgotpasswordService.updatePassword(data).subscribe(
        res => {
          console.log("Update Result", res);
          this.isShow = 0;
          this.navCtrl.setRoot('LoginPage');

        },
        error => {
          this.presentToast("Error in update password");
          console.log(error);

        }
      )
    } else {
      this.presentToast("New & Confirm Password should be same");
    }
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
