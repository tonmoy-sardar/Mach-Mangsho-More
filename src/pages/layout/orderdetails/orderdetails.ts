import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ProductService } from '../../../core/services/product.service';
import { ProfileService } from '../../../core/services/profile.service';

/**
 * Generated class for the OrderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage {
  userId:number;
  orderList:any=[];
  imageBaseUrl:any;
  profileDetails:any={};
  orderDetails:any={};
  productList:any=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public productService: ProductService,
    public profileService:ProfileService,
    ) {
      events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
      this.imageBaseUrl = environment.imageBaseUrl;
      this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailsPage');
    this.menuCtrl.close();
    this.getOrderDetails(this.navParams.get('id'));
    this.getProfileDetails(this.userId);
  }

  getOrderDetails(id) {
    this.productService.getorderDetails(id).subscribe(
      res => {
       this.orderDetails = res['result'];
       this.productList = res['result']['order_details'];
       console.log("Order Details ==>", this.orderDetails);
       console.log("Product List ==>", this.productList);
      },
      error => {
      }
    )
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

  goBack() {
    this.navCtrl.pop();
  }

}
