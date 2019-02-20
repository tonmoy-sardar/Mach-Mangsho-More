import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { environment } from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ProductService } from '../../../core/services/product.service';
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
  userId: number;
  whisListProduct: any = [];
  imageBaseUrl: any;
  visibleKey: boolean;
  searchText: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public alertCtrl: AlertController,
    private speechRecognition: SpeechRecognition,
    private platform: Platform,
    private zone: NgZone,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.searchText == '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
    this.visibleKey = false;
    this.menuCtrl.close();
    this.getWishList(this.userId);
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

  getWishList(id) {
    this.spinnerDialog.show();
    this.productService.myWishlist(id).subscribe(
      res => {
        this.whisListProduct = res['result'];
        this.visibleKey = true;

        console.log(this.whisListProduct);
        this.spinnerDialog.hide();
      },
      error => {
        this.visibleKey = true;

        // this.whisListProduct =[];
      }
    )
  }

  // deleteWishList(id) {
  //   let data =  {
  //     "product_id": id,
  //     "whist_status": "0",
  //     "user_id":this.userId
  // }
  // this.spinnerDialog.show();
  // this.productService.addWishlist(data).subscribe(
  //   res => {
  //     console.log(res);
  //     this.getWishList(this.navParams.get('id'));
  //     this.presentToast("Removed from Wishlist");
  //     //this.navCtrl.push('WishlistPage');
  //     this.spinnerDialog.hide();
  //   },
  //   error => {
  //     //this.presentToast("");
  //   }
  // )
  // }

  deleteWishList(id) {
    let data = {
      "product_id": id,
      "whist_status": "0",
      "user_id": this.userId
    }
    let alert = this.alertCtrl.create({
      message: 'Do you want to remove?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.productService.addWishlist(data).subscribe(
              res => {
                console.log(res);
                this.getWishList(this.userId);
                this.presentToast("Removed from Wishlist");
                //this.navCtrl.push('WishlistPage');
                this.spinnerDialog.hide();
              },
              error => {
                //this.presentToast("");
              }
            )
          }
        }
      ]
    });
    alert.present();
  }

  gotoDetails(id) {
    this.navCtrl.push('ProductdetailsPage', { id: id });
  }

  start() {
    console.log("Voice button clicked!!!");
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          console.log(matches);
          this.visibleKey = false;
          this.searchText = matches[0];
          console.log(this.searchText);
          this.spinnerDialog.show();
          this.productService.myWishlistSearch(this.userId, this.searchText).subscribe(
            res => {
              this.visibleKey = true;
              this.zone.run(() => this.whisListProduct = res['result']);
              
              console.log(this.whisListProduct);
              this.spinnerDialog.hide();
            },
            error => {
           
              this.spinnerDialog.hide();
              // this.whisListProduct =[];
            }
          )
        })
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
