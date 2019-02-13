import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ProductService } from '../../../core/services/product.service';

/**
 * Generated class for the TriviaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html',
})
export class TriviaPage {
  triviaDetails:any=[];
  imageBaseUrl:any;
  proDetails:any={};
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
    console.log('ionViewDidLoad TriviaPage');
    this.getTriviaDetails(this.navParams.get('id'));
    this.productDetails(this.navParams.get('id'));
  }

  getTriviaDetails(id) {
    this.spinnerDialog.show();
    this.productService.getriviaDetails(id).subscribe(
      res => {
        this.triviaDetails = res['result'];
        console.log("zzzz",this.triviaDetails);
        this.spinnerDialog.hide();
      },
      error => {
        this.triviaDetails =[];
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
