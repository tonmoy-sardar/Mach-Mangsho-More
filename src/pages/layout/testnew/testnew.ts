import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";
/**
 * Generated class for the TestnewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var jQuery: any;
@IonicPage()
@Component({
  selector: 'page-testnew',
  templateUrl: 'testnew.html',
})
export class TestnewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
      // jQuery('.wheel').circleMenu({
      //   lockDirection: true,
      //   dragMouse: true,
      //   dragTouch: true
      // });
  }

}
