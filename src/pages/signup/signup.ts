import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SignupService } from '../../core/services/signup.service';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public signupService:SignupService
    ) {
      //Header Show Hide Code 
      events.publish('hideHeader', { isHeaderHidden: true,isSubHeaderHidden: true}); 

      this.signupForm = this.formBuilder.group({
        name: ["",Validators.required],
        email: ["",Validators.required],
        contact: ["",Validators.required],
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
    if (this.signupForm.valid) {
      this.signupForm.value.otp_verified =  '1';
      this.signupForm.value.address =  '1';
      this.signupService.userSignup(this.signupForm.value).subscribe(
        res => {
          console.log(res);
          // localStorage.setItem('isLoggedin', 'true');
          // localStorage.setItem('userId', res['result']['id']);
          // localStorage.setItem('userName', res['result']['name']);
          // localStorage.setItem('userEmail', res['result']['email']);
          // localStorage.setItem('userContact', res['result']['contact']);
          
         // this.signupService.loginStatus(true);
          this.presentToast("Succesfully User Register");
          this.navCtrl.setRoot('LoginPage');
       
        },
        error => {
          this.presentToast("Error in User Registration");
          console.log(error);
    
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

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
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
