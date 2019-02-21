import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { CartService } from '../../../core/services/cart.service';
import { ProfileService } from '../../../core/services/profile.service';



/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  userId: any;
  customer_cart_data: any = [];
  all_cart_data: any;
  total_item_price: any;
  total_packing_price: any;
  total_price: any;
  imageBaseUrl: any;
  total_market_price: any;
  total_market_saving: any;
  profileDetails: any = {};
  todayDate;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public cartService: CartService,
    public profileService: ProfileService,
    public alertCtrl: AlertController
  ) {
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false }); // For Show- hide Header
    this.imageBaseUrl = environment.imageBaseUrl;
    
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }
    else {
      this.userId = '';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.populateData();
    this.getProfileDetails(this.userId);
    this.todayDate = Date.now();
  }

  goback() {
    this.navCtrl.pop();
  }

  gotoPage() {
    if (this.userId != '') {
      this.navCtrl.push('MyaddressPage');
    }
    else {
      this.navCtrl.push('LoginPage');
    }

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

  // increment(i) {
  //   var qty = this.customer_cart_data[i].quantity;
  //   this.customer_cart_data[i].quantity = qty + 1;
  //   //var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.package_id == this.customer_cart_data[i].package_id);
  //   var index = this.all_cart_data.findIndex(x => x.product_id == this.customer_cart_data[i].product_id);
  //   if (index != -1) {
  //     this.all_cart_data[index].quantity = qty + 1;
  //     this.setCartData()
  //   }
  // }

  setCartData() {
    console.log(this.all_cart_data);
    sessionStorage.setItem("cart", JSON.stringify(this.all_cart_data));
    this.getTotalItemPrice();
    this.getTotalPackingPrice();
  }

  getTotalItemPrice() {
    this.total_item_price = 0;
    this.total_market_price = 0;
    this.total_market_saving = 0
    console.log(this.customer_cart_data);
    this.customer_cart_data.forEach(x => {
      // if (x.discounted_price > 0) {
      //   this.total_item_price += (x.discounted_price * x.quantity);
      //   this.total_market_price += x.totalMarketPrice;
      //   this.total_market_saving += x.totalSavings;
      //   console.log(this.total_item_price);
      // }
      // else {
      //   console.log("zz", x);
      //   this.total_item_price += (x.price * x.quantity);
      //   this.total_market_price += x.totalMarketPrice;
      //   this.total_market_saving += x.totalSavings;
      // }

      this.total_item_price += (x.price * x.quantity);
      this.total_market_price += (x.market_price * x.quantity);
      this.total_market_saving += (this.total_market_price - this.total_item_price);
    })
  }

  getTotalPackingPrice() {
    this.total_packing_price = 0;
    this.customer_cart_data.forEach(x => {
      this.total_packing_price += x.packing_charges;
    })
  }

  removeCart(id) {
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
            console.log('Buy clicked');
            // var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.package_id == id);
            var index = this.all_cart_data.findIndex(x => x.product_id == id);
            if (index != -1) {
              //this.all_cart_data.splice(index, 1);
              this.customer_cart_data.splice(index, 1);
              this.setCartData()
            }
            this.cartService.cartNumberStatus(true);
            // this.populateData()
          }
        }
      ]
    });
    alert.present();
  }

  increment(i) {
    var qty = this.customer_cart_data[i].quantity;
    this.customer_cart_data[i].quantity = qty + 1;
    var index = this.all_cart_data.findIndex(x => x.customer_id == this.userId && x.product_id == this.customer_cart_data[i].product_id);
    if (index != -1) {
      this.all_cart_data[index].quantity = qty + 1;
      this.all_cart_data[index].totalOurPrice = (this.all_cart_data[index].price * this.all_cart_data[index].quantity);
      this.all_cart_data[index].totalMarketPrice = (this.all_cart_data[index].market_price * this.all_cart_data[index].quantity);
      this.all_cart_data[index].totalSavings = (this.all_cart_data[index].totalMarketPrice - this.all_cart_data[index].totalOurPrice);
      this.setCartData()
    }
  }

  decrement(i) {
    var qty = this.customer_cart_data[i].quantity;
    if (qty > 1) {
      this.customer_cart_data[i].quantity = qty - 1;
      var index = this.all_cart_data.findIndex(x => x.customer_id == this.userId && x.product_id == this.customer_cart_data[i].product_id);
      if (index != -1) {
        this.all_cart_data[index].quantity = qty - 1;
        this.all_cart_data[index].totalOurPrice = (this.all_cart_data[index].price * this.all_cart_data[index].quantity);
        this.all_cart_data[index].totalMarketPrice = (this.all_cart_data[index].market_price * this.all_cart_data[index].quantity);
        this.all_cart_data[index].totalSavings = (this.all_cart_data[index].totalMarketPrice - this.all_cart_data[index].totalOurPrice);
        this.setCartData()
      }
    }
    else {
      this.removeCart(this.customer_cart_data[i].product_id)
    }
  }
  presentConfirm() {

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

}
