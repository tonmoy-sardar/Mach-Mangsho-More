import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ToastController } from 'ionic-angular';
import { environment } from '../../../core/global';
import { ProductService } from '../../../core/services/product.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition';


/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ segment: 'productlist/:id/:name' })
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  allProductList: any = [];
  imageBaseUrl: any;
  catName: string;
  userId: number;
  searchText: string;
  visibleKey: boolean;
  categoryBannerImage: any;
  defaultPagination: number;
  productResultNext: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    private toastCtrl: ToastController,
    private speechRecognition: SpeechRecognition,
    public productService: ProductService,
    private zone: NgZone,
    private platform: Platform
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false, backButtonHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.searchText == '';

  }

  ionViewDidLoad() {
    this.visibleKey = false;
    this.catName = this.navParams.get('name');
    this.defaultPagination = 1;
    this.productList(this.navParams.get('id'));
    if (this.platform.is('cordova')) {
      // Check permission
      this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => console.log(hasPermission))

      // Request permissions
      this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
    }
    else {

    }
  }

  productList(id) {
    this.spinnerDialog.show();
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.productService.getProductList(id, params).subscribe(
      res => {
        console.log(res);
        this.categoryBannerImage = res['category_banner_image'];
        this.productResultNext = res['result']['next'];
        this.allProductList = res['result']['productlist'];
        this.visibleKey = true;
        this.spinnerDialog.hide();
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.spinnerDialog.show();
    this.defaultPagination = this.defaultPagination + 1;
    var params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());

    this.productService.getProductList(this.navParams.get('id'), params).subscribe(
      res => {
        console.log(res);
        this.categoryBannerImage = res['category_banner_image'];
        this.productResultNext = res['result']['next'];
        res['result']['productlist'].forEach(x => {
          this.allProductList.push(x);
        })
        this.visibleKey = true;
        this.spinnerDialog.hide();
        infiniteScroll.complete();
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
        infiniteScroll.complete();
      }
    )

    console.log('Begin async operation end');
  }
  start() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.visibleKey = false;
          this.searchText = matches[0];
          this.allProductList = [];
          this.spinnerDialog.show();
          this.productService.productSearch(this.navParams.get('id'), this.searchText).subscribe(
            res => {
              this.visibleKey = true
              this.zone.run(() => this.allProductList = res['result']['products']);

              this.spinnerDialog.hide();
            },
            error => {
              this.spinnerDialog.hide();
            }
          )
        })
  }
  proSearch(searchtxt) {
    this.visibleKey = false;
    this.searchText = searchtxt;
    this.allProductList = [];
    this.spinnerDialog.show();
    this.productService.productSearch(this.navParams.get('id'), this.searchText).subscribe(
      res => {
        this.visibleKey = true
        this.zone.run(() => this.allProductList = res['result']['products']);

        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

  gotoDetails(id) {
    this.navCtrl.push('ProductdetailsPage', { id: id });
  }
  addWishList(id) {
    let data = {
      "product_id": id,
      "whist_status": "1",
      "user_id": this.userId
    }
    this.spinnerDialog.show();
    this.productService.addWishlist(data).subscribe(
      res => {
        this.productList(this.navParams.get('id'));
        this.spinnerDialog.hide();
        this.presentToast("Added in Wishlist");
      },
      error => {
        this.spinnerDialog.hide();
        this.presentToast("Already added in Wishlist");
      }
    )
  }

  gotoPage(page) {
    this.navCtrl.push(page);
  }



  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
