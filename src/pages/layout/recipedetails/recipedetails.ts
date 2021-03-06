import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../../../core/services/product.service';
/**
 * Generated class for the RecipedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ segment: 'recipedetails/:id' })
@Component({
  selector: 'page-recipedetails',
  templateUrl: 'recipedetails.html',
})
export class RecipedetailsPage {
  rating;
  avg_rating;
  recipeDetails: any = {};
  imageBaseUrl: any;
  recipeBannerImage: any;
  userId:any;

  visibleKey: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private spinnerDialog: SpinnerDialog,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private domSanitizer: DomSanitizer,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    this.rating = [1, 2, 3, 4, 5];
    this.getRecipeDetails(this.navParams.get('id'));
  }

  getRecipeDetails(id) {
    this.spinnerDialog.show();
    this.productService.getrecipeDetails(id).subscribe(
      res => {
        this.recipeDetails = res['result'];
        this.recipeBannerImage = this.imageBaseUrl + this.recipeDetails.blog_large_image;
        this.visibleKey = true;
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
        this.visibleKey = true;
      }
    )
  }

  gotoRatePage(id) {
    this.navCtrl.push('RatingPage', { id: id });
  }

  shareInfo(recipeDetails) {

    this.socialSharing.share(recipeDetails.blog_content_remove_tag, recipeDetails.blog_title, '').
      then(() => {
        this.presentToast("successfully Share");
      }).catch(() => {
        this.presentToast("Error in Share");
      });
  }
  gotoPage(page) {
    this.navCtrl.push(page);
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
