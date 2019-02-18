import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SignupService } from '../../core/services/signup.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  isShowHeader:number;
  signupForm: FormGroup;
  contact;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public signupService:SignupService,
    private spinnerDialog: SpinnerDialog
    ) {
      //Header Show Hide Code 
      events.publish('hideHeader', { isHeaderHidden: true,isSubHeaderHidden: true}); 

      this.signupForm = this.formBuilder.group({
        name: ["",Validators.required],
        email: ["",[
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]],
        contact: ["", [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]],
        password: ["", Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  gotoSignin() {
    this.navCtrl.push('LoginPage');
  }


  signUp() {
    this.spinnerDialog.show();
    if (this.signupForm.valid) {
      this.signupForm.value.otp_verified =  '1';
      this.signupForm.value.address =  '1';
      this.signupService.userSignup(this.signupForm.value).subscribe(
        res => {
          console.log(res);
         // this.signupService.loginStatus(true);
          this.presentToast("Succesfully User Register");
          this.navCtrl.setRoot('LoginPage');
          this.spinnerDialog.hide();
        },
        error => {
          this.presentToast("Error in User Registration");
          console.log(error);
          this.spinnerDialog.hide();
    
        }
      )
    } else {
      this.markFormGroupTouched(this.signupForm)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValid(field: string) {
    return !this.signupForm.get(field).valid && (this.signupForm.get(field).dirty || this.signupForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.signupForm.get(field).invalid && (this.signupForm.get(field).dirty || this.signupForm.get(field).touched),
      'is-valid': this.signupForm.get(field).valid && (this.signupForm.get(field).dirty || this.signupForm.get(field).touched)
    };
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

}
