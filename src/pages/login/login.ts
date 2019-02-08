import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { ApiProvider} from '../../core/api/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { LoginService} from '../../core/services/login.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
   // public api:ApiProvider,
    private toastCtrl: ToastController,
    public menuCtrl:MenuController,
    public loginService:LoginService,
    private formBuilder: FormBuilder,
    private spinnerDialog: SpinnerDialog
    ) {
      //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: true,isSubHeaderHidden: true}); 
    this.loginForm = this.formBuilder.group({
      email_contact: ["",Validators.required],
      password: ["", Validators.required]
    });
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.close();

  }
  

  gotoSignup() {
    this.navCtrl.push('SignupPage');
  }
  gotoForgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  // signin() {
  //   this.navCtrl.setRoot('DashboardPage');
  // }

  signIn() {
    if (this.loginForm.valid) {
      this.spinnerDialog.show();
      this.loginService.userLogin(this.loginForm.value).subscribe(
        res => {
          console.log("Signin Result ==>",res);
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userId', res['result']['id']);
          localStorage.setItem('userName', res['result']['name']);
          localStorage.setItem('userEmail', res['result']['email']);
          localStorage.setItem('userContact', res['result']['contact']);
          localStorage.setItem('userImage', res['result']['profile_image']);
          this.loginService.loginStatus(true);
          this.presentToast("Succesfully Login");
          this.navCtrl.setRoot('DashboardPage');
          this.spinnerDialog.hide();
        },
        error => {
          this.presentToast("Please enter valid login credentials");
          console.log(error);
          this.spinnerDialog.hide();
    
        }
      )
    } else {
      this.markFormGroupTouched(this.loginForm)
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

  gotoDashboard() {
    this.navCtrl.setRoot('DashboardPage');
  }


}
