import { Component,ViewChild } from '@angular/core';
import { IonicPage,Slides, NavController, MenuController, NavParams,Events } from 'ionic-angular';
import { environment } from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ProductService } from '../../../core/services/product.service';
import * as $ from "jquery";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var jQuery: any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  showCat: number;
  categoryList: any = [];
  imageBaseUrl: any;
  startCatNum: number;
  endCatNum: number;

  public showLeftButton: boolean;
  public showRightButton: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public productService: ProductService,
    private spinnerDialog: SpinnerDialog
  ) {
    this.showCat = 1;
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false,backButtonHidden:true }); // For Show- hide Header
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getcategoryList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.menuCtrl.close();
    this.startCatNum = 0
    this.endCatNum = 3;
    setTimeout(() => {
      jQuery('.rotating-slider').rotatingSlider({
        slideHeight : Math.min(360, window.innerWidth -80),
        slideWidth : Math.min(480, window.innerWidth - 80),
      });
    }, 2000);
 
  }

  ionViewDidEnter() {
    this.events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false,backButtonHidden:true }); // For Show- hide Header
  }

  moreCategory() {
    this.showCat = 2;
  }

  lessCategory() {
    this.showCat = 1;
  }

  goToProList(id, name) {
    this.navCtrl.push('ProductlistPage', { id: id, name: name });
  }

  getcategoryList() {
    this.spinnerDialog.show();
    this.productService.getCategoryList().subscribe(
      res => {
        this.categoryList = res['result'];
        console.log(this.categoryList);

    // Check which arrows should be shown
    this.showLeftButton = false;
    this.showRightButton = this.categoryList.length > 3;
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

}
