import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
//Services
import { CartService } from '../../../core/services/cart.service';
import { ProfileService } from '../../../core/services/profile.service';

@IonicPage()
@Component({
  selector: 'page-paymentmode',
  templateUrl: 'paymentmode.html',
})
export class PaymentmodePage {
  customer_cart_data: any = [];
  all_cart_data: any;
  imageBaseUrl: any;
  allAddressList: any = [];
  profileDetails: any = {};
  total_item_price: any;
  total_packing_price: any;
  total_price: any;
  total_market_price: any;
  total_market_saving: any;
  all_customer_data: any;
  order_data: any;
  user_email: any;
  order_details: any;
  orderStatus: any;
  delivery_charge;
  todayDate;
  userId: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private spinnerDialog: SpinnerDialog,
    public profileService: ProfileService,
    public cartService: CartService
  ) {
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false }); // For Show- hide Header
    this.userId = +localStorage.getItem('userId');
    this.user_email = localStorage.getItem('userEmail');
    this.imageBaseUrl = environment.imageBaseUrl;
    this.all_customer_data = JSON.parse(sessionStorage.getItem("customer_details"));
    console.log(this.all_customer_data);
    this.delivery_charge = parseFloat(this.all_customer_data.delivery_slot.deliver_charge);
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }
    else {
      this.userId = '';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentmodePage');
    this.getProfileDetails(this.userId);
    this.populateData();
    this.todayDate = Date.now();
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

  // placeOrder(payment_type) {
  //   console.log("Final Cart==>",this.customer_cart_data);

  // }

  placeOrder(payment_type) {
    console.log("cccc",this.all_customer_data);
    this.order_data = {};
    this.order_data.payment_type = payment_type;
    this.order_data.address_id = this.all_customer_data.address_id;
    this.order_data.address = this.all_customer_data.address;
    this.order_data.customer_id = this.userId;
    this.order_data.customer_email = this.user_email;
    this.order_data.order_total_price = this.total_item_price + parseFloat(this.all_customer_data.delivery_slot.deliver_charge);
    this.order_details = [];
    this.customer_cart_data.forEach(item => {
      this.order_details.push(
        {
          'product_id': item.product_id,
          'quantity': item.quantity,
          'unit_price': item.price,
          'IGST': '',
          'CGST': '',
          'GST': ''
        }
      );
    });
    this.order_data.order_details = this.order_details;
    this.cartService.addOrder(this.order_data).subscribe(
      res => {
        this.orderStatus = res.result;
        console.log(this.orderStatus);
        sessionStorage.clear();
        this.cartService.cartNumberStatus(true);
        this.navCtrl.push('OrdersuccessPage');
        // if (payment_type == 1) {
        //   this.getPaymentSettingsDetails();
        // }
        // else {
        //   sessionStorage.clear();
        //   this.cartService.cartNumberStatus(true);
        //   this.router.navigateByUrl('/ordersuccess/' + this.orderStatus.id);
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

}
