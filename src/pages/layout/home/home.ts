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
    this.categoryRotate();
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
    }, 4000);
  

    //this.getcategoryList();
    
  }

  ionViewDidEnter() {
    this.events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false,backButtonHidden:true }); // For Show- hide Header
  }

  moreCategory() {
    this.showCat = 2;
    //this.categoryRotate();
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

  categoryRotate() {
    $(document).ready(function (ev) {
      var toggle = $('#ss_toggle');
      var menu = $('#ss_menu');
      var rot;

      $('#ss_toggle').on('click', function (ev) {
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

      menu.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        if ((rot / 180) % 2 == 0) {
          $('#ss_menu div i').addClass('ss_animate');
        } else {
          $('#ss_menu div i').removeClass('ss_animate');
        }
      });

    });
  }

  // Method executed when the slides are changed
  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
}

// Method that shows the next slide
public slideNext(): void {
    this.slides.slideNext();
}

// Method that shows the previous slide
public slidePrev(): void {
    this.slides.slidePrev();
}

}
