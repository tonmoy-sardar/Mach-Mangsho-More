import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams,Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ToastController } from 'ionic-angular';
import { environment } from '../../../core/global';
import { ProductService } from '../../../core/services/product.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition';


/**
 * Generated class for the TodayspecialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todayspecial',
  templateUrl: 'todayspecial.html',
})
export class TodayspecialPage {
  allProductList: any = [];
  imageBaseUrl: any;
  catName: string;
  userId: number;
  searchText: string;
  visibleKey: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    private toastCtrl: ToastController,
    public menuCtrl:MenuController,
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
    this.menuCtrl.close();
    this.visibleKey = false;
    this.catName = this.navParams.get('name');
    this.productList(this.userId);
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

  productList(user_id) {
    this.spinnerDialog.show();
    this.productService.getTodayspecialList(user_id).subscribe(
      res => {
        this.allProductList = res['result'];
        this.visibleKey = true;
        this.spinnerDialog.hide();
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  }

  
  gotoPage(page) {
    this.navCtrl.push(page);
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
        this.productList(this.userId);
        this.spinnerDialog.hide();
        this.presentToast("Added in Wishlist");      
      },
      error => {
        this.spinnerDialog.hide();
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
