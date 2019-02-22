import { Component, NgZone } from '@angular/core';
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
        this.spinnerDialog.hide();
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  }

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
                this.getWishList(this.userId);
                this.presentToast("Removed from Wishlist");
                this.spinnerDialog.hide();
              },
              error => {
                this.spinnerDialog.hide();
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
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.visibleKey = false;
          this.searchText = matches[0];
          this.spinnerDialog.show();
          this.productService.myWishlistSearch(this.userId, this.searchText).subscribe(
            res => {
              this.visibleKey = true;
              this.zone.run(() => this.whisListProduct = res['result']);
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
    this.spinnerDialog.show();
    this.productService.myWishlistSearch(this.userId, this.searchText).subscribe(
      res => {
        this.visibleKey = true;
        this.zone.run(() => this.whisListProduct = res['result']);
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
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
