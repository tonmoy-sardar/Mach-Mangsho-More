import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
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
  forgotForm: FormGroup;
  otpForm: FormGroup;
  newPasswordForm:FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    private formBuilder: FormBuilder,
    public forgotpasswordService: ForgotpasswordService
  ) {
    this.isShow = 0;
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: true, isSubHeaderHidden: true });
    this.forgotForm = this.formBuilder.group({
      contact_or_email: ["", Validators.required]
    });
    this.otpForm = this.formBuilder.group({
      otp: ["", Validators.required]
    });
    this.newPasswordForm = this.formBuilder.group({
      newpass: ["", Validators.required],
      confpass: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
  }
  gotoSignin() {
    this.navCtrl.push('LoginPage');
  }
  resetPassword(data) {
    this.useContactEmail = data.contact_or_email;

    if (this.useContactEmail != undefined) {
      this.spinnerDialog.show();
      this.forgotpasswordService.userForgotPassword(data).subscribe(
        res => {
          this.isShow = 1;
          this.newOtp = res['result']['otp'];
          this.getResult = res['result'];
          this.spinnerDialog.hide();
        },
        error => {
          this.presentToast("Please check your contact number");
          this.spinnerDialog.hide();
        }
      )
    } else {
      this.presentToast("Please check your contact number");
    }

  }

  matchOtp(data) {
    if (data != "") {
      this.spinnerDialog.show();
      if (this.newOtp == btoa(data.otp)) {
        this.otpVerified = 1;
        this.isShow = 2;
        this.spinnerDialog.hide();
      }
      else {
        this.presentToast("OTP mismatch");
        this.spinnerDialog.hide();
      }
    } else {
      this.presentToast("Please Enter OTP");
      this.spinnerDialog.hide();
    }
  }

  updatePassword(data) {
    if (data.newpass == data.confpass) {
      this.spinnerDialog.show();
      data.otp_verified = 1;
      data.password = data.newpass;
      data.contact_or_email = this.useContactEmail;
      this.forgotpasswordService.updatePassword(data).subscribe(
        res => {
          this.isShow = 0;
          this.navCtrl.setRoot('LoginPage');
          this.spinnerDialog.hide();
        },
        error => {
          this.presentToast("Error in update password");
          this.spinnerDialog.hide();

        }
      )
    } else {
      this.presentToast("New & Confirm Password should be same");
      this.spinnerDialog.hide();
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

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValidForgot(field: string) {
    return !this.forgotForm.get(field).valid && (this.forgotForm.get(field).dirty || this.forgotForm.get(field).touched);
  }

  displayFieldCssForgot(field: string) {
    return {
      'is-invalid': this.forgotForm.get(field).invalid && (this.forgotForm.get(field).dirty || this.forgotForm.get(field).touched),
      'is-valid': this.forgotForm.get(field).valid && (this.forgotForm.get(field).dirty || this.forgotForm.get(field).touched)
    };
  }

  isFieldValidOtp(field: string) {
    return !this.otpForm.get(field).valid && (this.otpForm.get(field).dirty || this.otpForm.get(field).touched);
  }

  displayFieldCssOtp(field: string) {
    return {
      'is-invalid': this.otpForm.get(field).invalid && (this.otpForm.get(field).dirty || this.otpForm.get(field).touched),
      'is-valid': this.otpForm.get(field).valid && (this.otpForm.get(field).dirty || this.otpForm.get(field).touched)
    };
  }

  isFieldValidNewpassword(field: string) {
    return !this.newPasswordForm.get(field).valid && (this.newPasswordForm.get(field).dirty || this.newPasswordForm.get(field).touched);
  }

  displayFieldCssNewpassword(field: string) {
    return {
      'is-invalid': this.newPasswordForm.get(field).invalid && (this.newPasswordForm.get(field).dirty || this.newPasswordForm.get(field).touched),
      'is-valid': this.newPasswordForm.get(field).valid && (this.newPasswordForm.get(field).dirty || this.newPasswordForm.get(field).touched)
    };
  }


}
