import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {ProductService} from '../../../core/services/product.service';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  showCat:number;
  categoryList:any =[];
  imageBaseUrl:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl:MenuController,
    public productService:ProductService,
    private spinnerDialog: SpinnerDialog
    ) {
    this.showCat=1; 
    events.publish('hideHeader', { isHeaderHidden: false,isSubHeaderHidden: false}); // For Show- hide Header
    this.imageBaseUrl = environment.imageBaseUrl;  
    this.getcategoryList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.menuCtrl.close();
  }

  moreCategory() {
    this.showCat=2;
  }

  lessCategory() {
    this.showCat=1;
  }

  goToProList(id,name) {
    this.navCtrl.push('ProductlistPage',{id: id,name:name});
  }

  getcategoryList() {
    this.productService.getCategoryList().subscribe(
      res => {
       this.categoryList = res['result'];
       console.log("Category List ==>", this.categoryList);
      },
      error => {
      }
    )
  }
 
}
