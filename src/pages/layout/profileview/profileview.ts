import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, NavParams } from 'ionic-angular';
import { Events, ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../core/global';
import { ProfileService } from '../../../core/services/profile.service';

/**
 * Generated class for the ProfileviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileview',
  templateUrl: 'profileview.html',
})
export class ProfileviewPage {
  userId: number;
  imageBaseUrl: any;
  profileDetails: any = [];
  addressForm: FormGroup;
  public buttonClicked: boolean = false;
  public showAddAddressForm: boolean = false;

  allAddressList: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private spinnerDialog: SpinnerDialog,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public profileService: ProfileService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
   
    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      address: ["", Validators.required],
      landmark: ["", Validators.required],
      pincode: ["", Validators.required],
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.getProfileDetails(this.userId);
  }

  getProfileDetails(id) {
    this.profileService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
      },
      error => {
      }
    )
  }
  onButtonClick() {

    this.spinnerDialog.show();
    this.profileService.addressList(this.userId).subscribe(
      res => {
        this.allAddressList = res['result'];
        this.buttonClicked = !this.buttonClicked;
        this.spinnerDialog.hide();
      },
      error => {
        this.buttonClicked = !this.buttonClicked;
        this.spinnerDialog.hide();
      }
    )
  }

  showAddAddress() {
    this.showAddAddressForm = !this.showAddAddressForm;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  submitAddress() {
    if (this.addressForm.valid) {
      this.spinnerDialog.show();
      this.addressForm.value.customer_id = this.userId;
      this.addressForm.value.state_id = '';
      this.profileService.submitAddress(this.addressForm.value).subscribe(
        res => {
          this.presentToast("Address added succesfully.");
          this.spinnerDialog.hide();
          this.addressForm.reset();
        },
        error => {
          this.presentToast("Please enter valid login credentials");
          this.spinnerDialog.hide();
        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
    }
  }

  isFieldValid(field: string) {
    return !this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.addressForm.get(field).invalid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched),
      'is-valid': this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched)
    };
  }

  deleteAddress(id) {
    let alert = this.alertCtrl.create({
      message: 'Do you want to remove?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.profileService.deleteMyAddress(id).subscribe(
              res => {
                this.onButtonClick();
                this.buttonClicked =true;
                this.presentToast("Removed from Address");
                this.spinnerDialog.hide();
              },
              error => {
                this.spinnerDialog.hide();
              }
            )
          }
        }
      ]
    });
    alert.present();
  }
  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      cssClass: "toast-success"
    });
    toast.present();
  }




}
