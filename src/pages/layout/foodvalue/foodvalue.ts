import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DocumentViewer,DocumentViewerOptions  } from '@ionic-native/document-viewer/ngx';
import {environment} from '../../../core/global';
import {ProductService} from '../../../core/services/product.service';
/**
 * Generated class for the FoodvaluePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foodvalue',
  templateUrl: 'foodvalue.html',
})
export class FoodvaluePage {
  imageBaseUrl:any;
  foodValue:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private document: DocumentViewer,
    public productService:ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;  

    
    this.productFoodValue(this.navParams.get('id'));
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodvaluePage');
    
  }
  productFoodValue(id) {
    this.productService.getFoodValue(id).subscribe(
      res => {
       this.foodValue = res['result'];
      //  const options: DocumentViewerOptions = {
      //   title: 'My PDF'
      // }
      //  this.document.viewDocument('assets/myFile.pdf', 'application/pdf', options)
       console.log("Food Value ==>", this.foodValue);
       
      },
      error => {
      }
    )
  }

}
