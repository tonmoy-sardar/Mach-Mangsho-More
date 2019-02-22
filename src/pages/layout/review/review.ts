import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  recipeDetails:any={};
  imageBaseUrl:any;
  recipeBannerImage:any;
  visibleKey: boolean;
  userId: number;
  recipeId: number;
  rating:number;
  reviewForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    private formBuilder: FormBuilder,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;  
    this.reviewForm = this.formBuilder.group({
      review: ["", Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
    this.userId = +localStorage.getItem('userId');
    this.recipeId = this.navParams.get('id');
    this.rating = this.navParams.get('rating');
    this.getRecipeDetails(this.navParams.get('id'));
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

  addReview() {
    if (this.reviewForm.valid) {
     var data = {
        "post_id": this.recipeId,
        "user_id": this.userId,
        "rating": this.rating ,
        "comment_parent":"0",
        "title":this.reviewForm.value.review
      }
      this.productService.addReview(data).subscribe(
        res => {
          this.presentToast("Review Added Succesfully");
          this.gotoPage(this.navParams.get('id'));
        },
        error => {
          this.presentToast("Rating not added");
        }
      )
    }
    else {
      this.markFormGroupTouched(this.reviewForm)
    }
  }
  gotoPage(id) {
    this.navCtrl.push('RecipedetailsPage',{id:id});
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValid(field: string) {
    return !this.reviewForm.get(field).valid && (this.reviewForm.get(field).dirty || this.reviewForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.reviewForm.get(field).invalid && (this.reviewForm.get(field).dirty || this.reviewForm.get(field).touched),
      'is-valid': this.reviewForm.get(field).valid && (this.reviewForm.get(field).dirty || this.reviewForm.get(field).touched)
    };
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
