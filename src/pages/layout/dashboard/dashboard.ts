import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams,Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {environment} from '../../../core/global';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {ProductService} from '../../../core/services/product.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

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
  startCatNum:number;
  endCatNum:number;
  searchText: string;
  loggedIn: boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl:MenuController,
    public productService:ProductService,
    private spinnerDialog: SpinnerDialog,
    private speechRecognition: SpeechRecognition,
    private platform:Platform
    ) {
    this.showCat=1; 
    events.publish('hideHeader', { isHeaderHidden: false,isSubHeaderHidden: false}); // For Show- hide Header
    this.imageBaseUrl = environment.imageBaseUrl;
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.menuCtrl.close();
    

    if (this.platform.is('cordova')) {
      // Check permission
   this.speechRecognition.hasPermission()
   .then((hasPermission: boolean) => console.log(hasPermission))

 // Request permissions
 this.speechRecognition.requestPermission()
   .then(
     () => console.log('Granted'),
     () => console.log('Denied')
   )
   }
   else {
     
   }
    
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


  gotoPage(page) {
    this.navCtrl.push(page);
  }
 
  start() {
    console.log("Voice button clicked!!!");
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          console.log(matches);
          this.searchText = matches[0];
         
          this.navCtrl.push('SearchPage',{searchText: this.searchText});
         
        })
  }

}
