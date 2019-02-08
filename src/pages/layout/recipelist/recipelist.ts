import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {environment} from '../../../core/global';
import {ProductService} from '../../../core/services/product.service';
/**
 * Generated class for the RecipelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipelist',
  templateUrl: 'recipelist.html',
})
export class RecipelistPage {
  proRecipeList:any=[];
  proDetails:any={};
  imageBaseUrl:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    public productService:ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipelistPage');
    this.productDetails(this.navParams.get('id'));
    this.recipeList(this.navParams.get('id'));
  }

  gotoDetails() {
    this.navCtrl.push('RecipedetailsPage');
  }

  recipeList(id) {
    this.spinnerDialog.show();
    this.productService.getRecipeList(id).subscribe(
      res => {
       this.proRecipeList = res['result']['recipeDetails'];
       console.log("Recipe List ==>", this.proRecipeList);
       this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }

  productDetails(id) {
    this.spinnerDialog.show();
    this.productService.getProductDetails(id).subscribe(
      res => {
        this.proDetails = res['result'];
        console.log(this.proDetails);
        this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }

}
