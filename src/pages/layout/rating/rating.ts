import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';
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
  recipeDetails:any={};
  imageBaseUrl:any;
  recipeBannerImage:any;
  visibleKey: boolean;
  rate;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
    this.userId = +localStorage.getItem('userId');
    this.recipeId = this.navParams.get('id');
    this.getRecipeDetails(this.navParams.get('id'));
  }

  gotoreviewPage() {
    this.navCtrl.push('ReviewPage');
  }

  onModelChange(event) {
    this.ratingNumber = event;
  }

  getRecipeDetails(id) {
    this.spinnerDialog.show();
    this.productService.getrecipeDetails(id).subscribe(
      res => {
       
        this.recipeDetails = res['result'];
        this.recipeBannerImage = this.imageBaseUrl+this.recipeDetails.blog_large_image;
       
        this.visibleKey = true;
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
        this.visibleKey = true;
      }
    )
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
          this.gotoPage(this.navParams.get('id'));
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

  gotoPage(id) {
    this.navCtrl.push('RecipedetailsPage',{id:id});
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
