import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {ProductService} from '../../../core/services/product.service';
import * as $ from "jquery";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  showCat:number;
  categoryList:any =[];
  imageBaseUrl:any;
  startCatNum:number;
  endCatNum:number;
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
    this.categoryRotate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.menuCtrl.close();
    this.startCatNum =0
    this.endCatNum=3;
    
  }

  moreCategory() {
    this.showCat=2;
    //this.categoryRotate();
  }

  lessCategory() {
    this.showCat=1;
  }

  goToProList(id,name) {
    this.navCtrl.push('ProductlistPage',{id: id,name:name});
  }

  getcategoryList() {
    this.spinnerDialog.show();
    this.productService.getCategoryList().subscribe(
      res => {
       this.categoryList = res['result'];
       console.log("Category List ==>", this.categoryList);
       this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }


  categoryRotate() {
    $(document).ready(function(ev) {
      var toggle = $('#ss_toggle');
      var menu = $('#ss_menu');
      var rot;
      
      $('#ss_toggle').on('click', function(ev) {
        rot = parseInt($(this).data('rot')) - 180;
        menu.css('transform', 'rotate(' + rot + 'deg)');
        menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
        if ((rot / 180) % 2 == 0) {
          //Moving in
          toggle.parent().addClass('ss_active');
          toggle.addClass('close');
        } else {
          //Moving Out
          toggle.parent().removeClass('ss_active');
          toggle.removeClass('close');
        }
        $(this).data('rot', rot);
      });
    
      menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        if ((rot / 180) % 2 == 0) {
          $('#ss_menu div i').addClass('ss_animate');
        } else {
          $('#ss_menu div i').removeClass('ss_animate');
        }
      });
      
    });
  }
 
}
