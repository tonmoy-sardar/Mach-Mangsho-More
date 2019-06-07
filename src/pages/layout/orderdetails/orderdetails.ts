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

@IonicPage( { segment: 'orderdetails/:id' })
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
  visibleKey: boolean;
  last_cat_id:any;
  last_cat_name:any;

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
    this.menuCtrl.close();
    this.getOrderDetails(this.navParams.get('id'));
  }

  getOrderDetails(id) {
    this.productService.getorderDetails(id).subscribe(
      res => {
       this.orderDetails = res['result'];
       console.log("Order Details Res ==>",res);

       this.visibleKey = true;
       this.spinnerDialog.hide();
       this.productList = res['result']['order_details'];
       var last_cat_index =  res['result']['order_details'].length -1;
       this.last_cat_id = res['result']['order_details'][last_cat_index]['product_cat_id'];
       this.last_cat_name = res['result']['order_details'][last_cat_index]['product_cat_name'];
       
       //alert(this.last_cat_id);
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }
  // goBack() {
  //   var lastpage =this.navCtrl.getPrevious().id;
  //   console.log("--------");
  //   console.log(lastpage);
  //   console.log("--------");
  //   console.log('ordersuccess')
  //   if(lastpage =='OrdersuccessPage') {
      
  //    // this.navCtrl.push('PaymentmodePage');
  //    this.navCtrl.popTo( this.navCtrl.getByIndex(-1));
  //   }
  //   else {
  //     this.navCtrl.pop();
  //   }

  //  //
  // }
  goBack() {
   // this.navCtrl.pop();
   this.navCtrl.push('HomePage');
  }

  gotoCategory(id,name) {
    alert(id+name);
    //this.navCtrl.push('HomePage');
    this.navCtrl.push('ProductlistPage', { id: id, name: name });
  }

}
