import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ToastController } from 'ionic-angular';
import { environment } from '../../../core/global';
import { ProductService } from '../../../core/services/product.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { e } from '@angular/core/src/render3';
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
  allProductList: any = [];
  imageBaseUrl: any;
  catName: string;
  userId: number;
  searchText: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    private toastCtrl: ToastController,
    private speechRecognition: SpeechRecognition,
    public productService: ProductService,
    private zone: NgZone,
    private platform:Platform
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.searchText =='';


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
    this.catName = this.navParams.get('name');
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
    this.productService.getProductList(id).subscribe(
      res => {
        this.allProductList = res['result']['products'];
        console.log("Product List123 ==>", this.allProductList);
        this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }

  start() {
    console.log("Voice button clicked!!!");
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          console.log(matches);
          this.searchText = matches[0];
          console.log(this.searchText);
          this.allProductList = [];
          this.productService.productSearch(this.navParams.get('id'), this.searchText).subscribe(
            res => {
              this.zone.run(() => this.allProductList = res['result']['products']);
              // console.log(res['result']['products']);
              // this.allProductList = res['result']['products'];
              // console.log("Product List ==>", this.allProductList);
              // setTimeout(() => {
              //   this.allProductList = res['result']['products'];
              //   console.log("Product List ==>", this.allProductList);
              // }, 3000)
            },
            error => {
            }
          )
        })
  }

  proSearch(keywords) {
    console.log("Test==>",keywords);
    this.productService.productSearch(this.navParams.get('id'), keywords).subscribe(
      res => {
        this.zone.run(() => this.allProductList = res['result']['products']);
      },
      error => {
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
      position: 'top'
    });
    toast.present();
  }

}
