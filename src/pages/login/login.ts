import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { ApiProvider} from '../../core/api/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { LoginService } from '../../core/services/login.service';

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
  isCart:any;
  lastPage:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    private spinnerDialog: SpinnerDialog
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: true, isSubHeaderHidden: true });
    this.loginForm = this.formBuilder.group({
      email_contact: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.isCart = JSON.parse(sessionStorage.getItem("cart"));
    console.log(this.isCart);
    this.lastPage=this.navCtrl.last();
    console.log(this.lastPage.id);
    
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

  gotoPage(page) {
    this.navCtrl.push(page);
  }
 
  signIn() {
    if (this.loginForm.valid) {
      this.spinnerDialog.show();
      this.loginService.userLogin(this.loginForm.value).subscribe(
        res => {
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userId', res['result']['id']);
          localStorage.setItem('userName', res['result']['name']);
          localStorage.setItem('userEmail', res['result']['email']);
          localStorage.setItem('userContact', res['result']['contact']);
          localStorage.setItem('userImage', res['result']['profile_image']);
          this.loginService.loginStatus(true);
          this.presentToast("Succesfully Login");
          if(this.lastPage.id =='WelcomePage' || this.lastPage.id =='ForgotPasswordPage' || this.lastPage.id =='SignupPage' || this.lastPage.id =='ProductdetailsPage' || this.lastPage.id =='RecipedetailsPage'  ) {
            this.lastPage.id ='HomePage';
          }
          if(this.isCart ==null || this.isCart.length==0) {
            //this.navCtrl.setRoot('HomePage');
            this.navCtrl.setRoot(this.lastPage.id);
            
          }
          else if(this.lastPage.id =='WelcomePage' || this.lastPage.id =='ForgotPasswordPage' || this.lastPage.id =='SignupPage' || this.lastPage.id =='ProductdetailsPage' || this.lastPage.id =='RecipedetailsPage'  ) {
            this.navCtrl.setRoot('HomePage');
          }
          else {
            this.navCtrl.setRoot('CartPage');
          }
          this.spinnerDialog.hide();
        },
        error => {
          this.presentToast("Please enter valid login credentials");
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

  isFieldValid(field: string) {
    return !this.loginForm.get(field).valid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.loginForm.get(field).invalid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched),
      'is-valid': this.loginForm.get(field).valid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched)
    };
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
