import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ProductService } from '../../../core/services/product.service';
/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  //rating: number = 4;
  ratingNumber: number;
  userId: number;
  recipeId: number;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
    this.userId = +localStorage.getItem('userId');
    this.recipeId = this.navParams.get('id');
  }

  gotoreviewPage() {
    this.navCtrl.push('ReviewPage');
  }

  onModelChange(event) {
    this.ratingNumber = event;
  }

  addRecipeRating() {
    if (this.ratingNumber) {
      var data = {
        "recipe_id": this.recipeId,
        "user_id": this.userId,
        "rating": this.ratingNumber
      }
      this.productService.addRating(data).subscribe(
        res => {
          console.log(res);
          this.presentToast("Rating Added Succesfully");
          this.navCtrl.pop();
        },
        error => {
          this.presentToast("Rating not added");
        }
      )
    }
    else {
      this.presentToast("Please select rating");
    }

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
