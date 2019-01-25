import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  rangeValue:any;
  proRate:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });

    this.rangeValue =1;
    this.proRate =10;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }
  gotoFoodValue() {
    this.navCtrl.push('FoodvaluePage');
  }
  gotoRecipe() {
    this.navCtrl.push('RecipelistPage');
  }
  gotoTrivia() {
    this.navCtrl.push('TriviaPage');
  }

  gotoCart() {
    this.navCtrl.push('CartPage');
  }

}
