import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ToastController } from 'ionic-angular';
import {environment} from '../../../core/global';
import {ProductService} from '../../../core/services/product.service';
/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  allProductList:any=[];
  imageBaseUrl:any;
  catName:string;
  userId:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    private toastCtrl: ToastController,
    public productService:ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;  
    this.userId = +localStorage.getItem('userId');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
    this.catName =this.navParams.get('name');
    this.productList(this.navParams.get('id'));
  }

  productList(id) {
    this.spinnerDialog.show();
    this.productService.getProductList(id).subscribe(
      res => {
       this.allProductList = res['result']['products'];
       console.log("Product List ==>", this.allProductList);
       this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }

  gotoDetails(id) {
    this.navCtrl.push('ProductdetailsPage',{id:id});
  }
  addWishList(id) {
    let data =  {
        "product_id": id,
        "whist_status": "1",
        "user_id":this.userId
    }
    this.productService.addWishlist(data).subscribe(
      res => {
        console.log(res);
        this.productList(this.navParams.get('id'));
        this.presentToast("Added in Wishlist");
        this.navCtrl.push('WishlistPage');
      },
      error => {
        this.presentToast("Already added in Wishlist");
      }
    )
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
