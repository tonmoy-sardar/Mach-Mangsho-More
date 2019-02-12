import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ProductService } from '../../../core/services/product.service';
/**
 * Generated class for the RecipedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipedetails',
  templateUrl: 'recipedetails.html',
})
export class RecipedetailsPage {
  recipeDetails:any={};
  imageBaseUrl:any;
  recipeBannerImage:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private spinnerDialog: SpinnerDialog,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipedetailsPage');
   this.getRecipeDetails(this.navParams.get('id'));
  }

  getRecipeDetails(id) {
    this.spinnerDialog.show();
    this.productService.getrecipeDetails(id).subscribe(
      res => {
        this.recipeDetails = res['result']['recipeDetails'][0];
        this.recipeBannerImage = this.imageBaseUrl+this.recipeDetails.blog_large_image;
        console.log(this.recipeDetails);
        this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }
  gotoRatePage() {
    this.navCtrl.push('RatingPage');
  }

}
