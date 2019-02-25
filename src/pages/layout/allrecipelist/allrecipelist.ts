import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
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

@IonicPage()
@Component({
  selector: 'page-allrecipelist',
  templateUrl: 'allrecipelist.html',
})
export class AllrecipelistPage {
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
    public menuCtrl: MenuController,
    public events: Events,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    this.rating = [1, 2, 3, 4, 5];
    this.menuCtrl.close();
    this.allrecipeList();
  }

  gotoDetails(id) {
    this.navCtrl.push('RecipedetailsPage', { id: id });
  }

  allrecipeList() {
    this.spinnerDialog.show();
    this.productService.getAllRecipeList().subscribe(
      res => {
        this.proRecipeList = res['result']['recipelist'];
        this.visibleKey = true;
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
        this.visibleKey = true;
      }
    )
  }

  productDetails(id) {
    this.spinnerDialog.show();
    this.productService.getProductDetails(id, this.userId).subscribe(
      res => {
        this.proDetails = res['result']['productlist'];
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

}
