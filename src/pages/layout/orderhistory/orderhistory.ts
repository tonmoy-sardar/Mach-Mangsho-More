import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
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
  visibleKey: boolean;
  productList;
  customer_cart_data: any;
  orderListNext:any;
  defaultPagination:number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public productService: ProductService,
    public cartService: CartService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.customer_cart_data = [];
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.defaultPagination = 1;
    this.getOrderList(this.userId);
  }
  getOrderList(id) {
    this.spinnerDialog.show();
    var params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.myOrderList(id,params).subscribe(
      res => {
        this.orderListNext = res['result']['next'];
       this.orderList = res['result']['orderlist'];
       this.visibleKey = true;
       this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
        this.visibleKey = true;
      }
    )
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.spinnerDialog.show();
    console.log("aa",this.defaultPagination);
    this.defaultPagination = this.defaultPagination + 1;
    console.log("bb",this.defaultPagination);
    var params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.myOrderList(this.userId,params).subscribe(
      res => {
        this.orderListNext = res['result']['next'];
     //  this.orderList = res['result']['orderlist'];
       res['result']['orderlist'].forEach(x => {
        this.orderList.push(x);
      })
       this.visibleKey = true;
       this.spinnerDialog.hide();
       infiniteScroll.complete();
      },
      error => {
        this.spinnerDialog.hide();
        this.visibleKey = true;
        infiniteScroll.complete();
      }
    )

    console.log('Begin async operation end');
  }

  gotoOrderDetails(id) {
    this.navCtrl.push('OrderdetailsPage',{id: id});
  }

  repeatOrder(order)
  {
    this.spinnerDialog.show();
    var productIds: any = [];
    order.order_details.forEach(x => {
      productIds.push(x.product_id)
    })
    var ids = productIds.toString();
    this.productService.getRepeatOrder(ids).subscribe(
      res => {
       this.productList = res['result'];
       
       for(var i=0; i<this.productList.length; i++)
       {
        var index = order.order_details.findIndex(x => x.product_id == this.productList[i].id);
        var quantity = order.order_details[index].quantity;
        var totalOurPrice =   (this.productList[i].price * quantity);
        var totalMarketPrice =   (this.productList[i].market_price * quantity);
        var totalSavings =   (totalMarketPrice - totalOurPrice);
        var data = {
          customer_id: this.userId,
          product_id: this.productList[i].id,
          product_name: this.productList[i].name,
          description: this.productList[i].description,
          price: this.productList[i].price,
          market_price: this.productList[i].market_price,
          quantity_count: this.productList[i].quantity_count,
          unit: this.productList[i].unit,
          image_small: this.productList[i].image_small,
          quantity: quantity,
          totalOurPrice: totalOurPrice,
          totalMarketPrice: totalMarketPrice,
          totalSavings: totalSavings
        }

        this.customer_cart_data.push(data);
        this.setCartData();
        this.cartService.cartNumberStatus(true);
        if(i==this.productList.length-1)
        {
          this.navCtrl.push('CartPage');
        }
       }

       this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
        
      }
    )
  }

  setCartData() {
    sessionStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }

}
