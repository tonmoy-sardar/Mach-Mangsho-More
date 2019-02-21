import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { environment } from '../../../core/global';
import { ProductService } from '../../../core/services/product.service';
/**
 * Generated class for the RecipelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage( { segment: 'recipelist/:id' })
@Component({
  selector: 'page-recipelist',
  templateUrl: 'recipelist.html',
})
export class RecipelistPage {
  rating;
  avg_rating;
  proRecipeList: any = [];
  proDetails: any = {};
  imageBaseUrl: any;
  userId: any;
  visibleKey: boolean;
  productName;
  productImage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipelistPage');
    this.rating = [1, 2, 3, 4, 5];
    this.recipeList(this.navParams.get('id'));
  }

  gotoDetails(id) {
    this.navCtrl.push('RecipedetailsPage', { id: id });
  }

  recipeList(id) {
    this.spinnerDialog.show();
    this.productService.getRecipeList(id).subscribe(
      res => {
        this.productName = res['product_name'];
        this.productImage = res['product_image'];
        this.proRecipeList = res['result'];
        console.log("Recipe List ==>", this.proRecipeList);
        this.visibleKey = true;
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
        this.visibleKey = true;
      }
    )
  }
}
