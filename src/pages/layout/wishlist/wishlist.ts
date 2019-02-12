import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {environment} from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {ProductService} from '../../../core/services/product.service';
/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  userId:number;
  whisListProduct:any=[];
  imageBaseUrl:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl:MenuController,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public productService:ProductService
    ) {
      //Header Show Hide Code 
      events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
      this.imageBaseUrl = environment.imageBaseUrl;  
      this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
    this.menuCtrl.close();
    this.getWishList(this.userId);
  }

  getWishList(id) {
    this.spinnerDialog.show();
    this.productService.myWishlist(id).subscribe(
      res => {
       this.whisListProduct = res['result'];
       console.log(this.whisListProduct);
      },
      error => {
       // this.whisListProduct =[];
      }
    )
  }

  deleteWishList(id) {
    let data =  {
      "product_id": id,
      "whist_status": "0",
      "user_id":this.userId
  }
  this.productService.addWishlist(data).subscribe(
    res => {
      console.log(res);
      this.getWishList(this.navParams.get('id'));
      this.presentToast("Removed from Wishlist");
      this.navCtrl.push('WishlistPage');
    },
    error => {
      //this.presentToast("");
    }
  )
  }

  gotoDetails() {
    this.navCtrl.push('ProductdetailsPage');
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
