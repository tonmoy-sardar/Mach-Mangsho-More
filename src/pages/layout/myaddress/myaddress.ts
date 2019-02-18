import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../core/global';
//Services
import { ProfileService } from '../../../core/services/profile.service';
/**
 * Generated class for the MyaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaddress',
  templateUrl: 'myaddress.html',
})
export class MyaddressPage {
  customer_cart_data: any = [];
  all_cart_data: any;
  userId: number;
  allAddressList: any = [];
  profileDetails: any = {};
  total_item_price: any;
  total_packing_price: any;
  total_price: any;
  imageBaseUrl: any;
  total_market_price: any;
  total_market_saving: any;
  addressForm: FormGroup;
  showAddressForm: boolean;
  pinCheckForm: FormGroup;
  pincode:number;
  deliverySlot :any=[];
  isAvailable:number;
  isActive:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public profileService: ProfileService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.userId = +localStorage.getItem('userId');
    this.imageBaseUrl = environment.imageBaseUrl;
    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      address: ["", Validators.required],
      landmark: ["", Validators.required],
      pincode: ["", Validators.required],
    });
    this.pinCheckForm = this.formBuilder.group({
      pincheck: ["", Validators.required],
    });

    // this.Form = this.formBuilder.group({
    //   type: ["", Validators.required],
    //   address: ["", Validators.required],
    //   landmark: ["", Validators.required],
    //   pincode: ["", Validators.required],
    // });

    this.showAddressForm = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaddressPage');
    this.myAddressList(this.userId);
    this.getProfileDetails(this.userId);
    this.populateData();

  }

  addNewAddress() {
    this.showAddressForm = true;
  }

  populateData() {
    if (sessionStorage.getItem("cart")) {
      this.all_cart_data = JSON.parse(sessionStorage.getItem("cart"));
      console.log(this.all_cart_data);
      this.customer_cart_data = this.all_cart_data;
      //this.customer_cart_data.length =1;


      this.getTotalItemPrice();
      this.getTotalPackingPrice();
    }
    else {
      this.customer_cart_data = [];
      //alert(this.customer_cart_data.length);
    }
  }
  getTotalItemPrice() {
    this.total_item_price = 0;
    this.total_market_price = 0;
    this.total_market_saving = 0
    console.log(this.customer_cart_data);
    this.customer_cart_data.forEach(x => {
      if (x.discounted_price > 0) {
        this.total_item_price += (x.discounted_price * x.quantity);
        this.total_market_price += x.totalMarketPrice;
        this.total_market_saving += x.totalSavings;
        console.log(this.total_item_price);

      }
      else {
        console.log("zz", x);
        this.total_item_price += (x.price * x.quantity);
        this.total_market_price += x.totalMarketPrice;
        this.total_market_saving += x.totalSavings;
      }
    })
  }

  getTotalPackingPrice() {
    this.total_packing_price = 0;
    this.customer_cart_data.forEach(x => {
      this.total_packing_price += x.packing_charges;
    })
  }

  getProfileDetails(id) {
    this.profileService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
        console.log("Profile Details ==>", this.profileDetails);
      },
      error => {
      }
    )
  }

  myAddressList(id) {
    this.spinnerDialog.show();
    this.profileService.addressList(id).subscribe(
      res => {
        this.allAddressList = res['result'];
        console.log("Address List ==>", this.allAddressList);
        this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }
  checkAvailability(i,addressId,pinCode) {
    this.profileService.getPinCode(pinCode).subscribe(
      res => {
        this.deliverySlot = res['result'];
        this.isAvailable = res['result'].length;    
        this.spinnerDialog.hide();
        if(this.isAvailable >0) {
          this.customer_cart_data.address_id =addressId;
          this.navCtrl.push('DeliveryslotPage',{pincode:pinCode});
        }
        else {
          this.isActive = i;
        }
      },
      error => {
        this.deliverySlot = [];
        this.isAvailable = 0;
        this.spinnerDialog.hide();
      }
    )
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
          this.showAddressForm = false;
          this.myAddressList(this.userId);
        },
        error => {
          this.presentToast("Please enter valid login credentials");
          console.log(error);
          this.spinnerDialog.hide();
        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
    }
  }

  checkPinCode() {
    if (this.pinCheckForm.valid) {
      this.spinnerDialog.show();
      console.log(this.pinCheckForm.value);
      this.pincode = this.pinCheckForm.value.pincheck;
      this.profileService.getPinCode(this.pincode).subscribe(
        res => {
          console.log(res);
         // this.deliverySlot = res['result'];
          this.isAvailable = res['result'].length;    
          this.spinnerDialog.hide();

        },
        error => {
          this.presentToast("Error");
          console.log(error);
          this.spinnerDialog.hide();
        }
      )
    } else {
      this.markFormGroupTouched(this.pinCheckForm)
    }
  }



  isFieldValid(field: string) {
    return !this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    console.log(this.addressForm)
    console.log(field)
    return {
      'is-invalid': this.addressForm.get(field).invalid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched),
      'is-valid': this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched)
    };
  }

  isFieldValidPinCheck(field: string) {
    return !this.pinCheckForm.get(field).valid && (this.pinCheckForm.get(field).dirty || this.pinCheckForm.get(field).touched);
  }

  displayFieldCssPinCheck(field: string) {
    return {
      'is-invalid': this.pinCheckForm.get(field).invalid && (this.pinCheckForm.get(field).dirty || this.pinCheckForm.get(field).touched),
      'is-valid': this.pinCheckForm.get(field).valid && (this.pinCheckForm.get(field).dirty || this.pinCheckForm.get(field).touched)
    };
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
