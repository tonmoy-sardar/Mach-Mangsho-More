import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ProductService } from '../../../core/services/product.service';
/**
 * Generated class for the OrderhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderhistory',
  templateUrl: 'orderhistory.html',
})
export class OrderhistoryPage {
  userId:number;
  orderList:any=[];
  imageBaseUrl:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderhistoryPage');
    this.menuCtrl.close();
    this.getOrderList(this.userId);
  }
  getOrderList(id) {
    this.spinnerDialog.show();
    this.productService.myOrderList(id).subscribe(
      res => {
       this.orderList = res['result'];
       console.log(this.orderList);
       this.spinnerDialog.hide();
      },
      error => {
        this.orderList =[];
      }
    )
  }

  gotoOrderDetails(id) {
    this.navCtrl.push('OrderdetailsPage',{id: id});
  }

}
