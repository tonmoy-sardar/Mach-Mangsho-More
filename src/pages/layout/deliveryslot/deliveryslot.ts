import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
//Services
import { ProfileService } from '../../../core/services/profile.service';

/**
 * Generated class for the DeliveryslotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ segment: 'deliveryslot/:pincode' })
@Component({
  selector: 'page-deliveryslot',
  templateUrl: 'deliveryslot.html',
})
export class DeliveryslotPage {
  deliverySlot;
  customer_cart_data: any = [];
  all_cart_data: any;
  userId: any;
  imageBaseUrl: any;
  allAddressList: any = [];
  profileDetails: any = {};
  total_item_price: any;
  total_packing_price: any;
  total_price: any;
  total_market_price: any;
  total_market_saving: any;
  all_customer_data: any;
  todayDate;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private spinnerDialog: SpinnerDialog,
    public profileService: ProfileService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.userId = +localStorage.getItem('userId');
    this.imageBaseUrl = environment.imageBaseUrl;
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }
    else {
      this.userId = '';
    }
  }

  ionViewDidLoad() {
    this.getProfileDetails(this.userId);
    this.populateData();
    this.getDeliverySlot();
    this.all_customer_data = JSON.parse(sessionStorage.getItem("customer_details"));
    this.todayDate = Date.now();
  }

  getDeliverySlot() {
    this.spinnerDialog.show();
    this.profileService.getPinCode(this.navParams.get('pincode')).subscribe(
      res => {
        this.deliverySlot = res['result'];
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }



  populateData() {
    if (sessionStorage.getItem("cart")) {
      this.all_cart_data = JSON.parse(sessionStorage.getItem("cart"));
      this.customer_cart_data = this.all_cart_data;
      this.getTotalItemPrice();
      this.getTotalPackingPrice();
    }
    else {
      this.customer_cart_data = [];
    }
  }
  getTotalItemPrice() {
    this.total_item_price = 0;
    this.total_market_price = 0;
    this.total_market_saving = 0
    this.customer_cart_data.forEach(x => {
      if (x.discounted_price > 0) {
        this.total_item_price += (x.discounted_price * x.quantity);
        this.total_market_price += x.totalMarketPrice;
        this.total_market_saving += x.totalSavings;
      }
      else {
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
      },
      error => {
      }
    )
  }

  gotoPayMode(delivery) {
    this.all_customer_data.delivery_slot = delivery;
    sessionStorage.setItem("customer_details", JSON.stringify(this.all_customer_data));
    this.navCtrl.push('PaymentmodePage');
  }

}
