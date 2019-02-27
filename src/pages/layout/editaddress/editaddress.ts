import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Platform, Nav, ActionSheetController, LoadingController, Loading } from 'ionic-angular';
import { Events, ToastController,ModalController,ViewController } from 'ionic-angular';
import { environment } from '../../../core/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
//Services
import { ProfileService } from '../../../core/services/profile.service';
/**
 * Generated class for the EditaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editaddress',
  templateUrl: 'editaddress.html',
})
export class EditaddressPage {
  addressForm: FormGroup;
  userId:any;
  addressDetails = {};
  addressId:number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private spinnerDialog: SpinnerDialog,
    public profileService: ProfileService,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
    ) {
    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      address: ["", Validators.required],
      landmark: ["", Validators.required],
      pincode: ["", Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaddressPage');
    this.userId = +localStorage.getItem('userId');
    this.addressId = this.navParams.get('id')
    this. showAddressForm(this.addressId);
  }

  showAddressForm(id) {
    this.profileService.myAddressDetails(id).subscribe(
      res => {
        this.addressDetails = res['result'];
        console.log(this.addressDetails)
      },
      error => {
      }
    )
  }

  updatemyAddress() {
    if (this.addressForm.valid) {
      this.spinnerDialog.show();
      this.addressForm.value.customer_id = this.userId;
      this.addressForm.value.state_id = '1';
      console.log(this.addressForm.value);
      this.profileService.updateAddress(this.addressForm.value,this.addressId).subscribe(
        res => {
          this.presentToast("Update address succesfully.");
          this.spinnerDialog.hide();
          this.addressForm.reset();
          this.viewCtrl.dismiss();
          this.navCtrl.push('ProfileeditPage');
        },
        error => {
          this.presentToast("Error in Address Update");
          this.spinnerDialog.hide();
        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
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
    return !this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.addressForm.get(field).invalid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched),
      'is-valid': this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched)
    };
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
