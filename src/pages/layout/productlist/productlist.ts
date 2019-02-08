import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    public productService:ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
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

}
