import { Component,ViewChild } from '@angular/core';
import { Nav,Platform,MenuController,LoadingController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import {environment} from '../core/global';
import {LoginService} from '../core/services/login.service';
import {CartService} from '../core/services/cart.service';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loggedIn:boolean;
  userName:string;
  imageBaseUrl:any;
  userImage:any;
  totalCart:any;
  @ViewChild(Nav) nav: Nav;
  //rootPage:any = HomePage;
  rootPage:any;
  topHeaderIsHidden:any;
  subHeaderIsHidden:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public events: Events,
    public loginService:LoginService,
    public cartService:CartService
    ) {
    this.presentLoadingCustom();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
      
      this.rootPage = 'LoginPage';
    });
    cartService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
    events.subscribe('hideHeader', (data) => {
      console.log("Header Data ==>",data);
      this.topHeaderIsHidden = data.isHeaderHidden;
      this.subHeaderIsHidden = data.isSubHeaderHidden;
    })

    this.imageBaseUrl = environment.imageBaseUrl;
    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));

    if (sessionStorage.getItem("cart")) {
      this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
      
    }
    else {
      this.totalCart = 0;
    }
  }
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 5000
    });

  }

  // toggleMenu() {
  //   alert();
  // }

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.userImage = localStorage.getItem('userImage');
      //this.userImage = this.imageBaseUrl+localStorage.getItem('userImage');
      console.log(this.userImage);
       
    }
    else {
      // this.authService.authState.subscribe((user) => {
      //   this.user = user;
      //   this.loggedIn = (user != null);
      //   if (this.loggedIn) {
      //     localStorage.setItem('isLoggedin', 'true');
      //   }
      // });
    }
  }

  cartNumberStatus(status: boolean) {
    if(status) {
      if(sessionStorage.getItem("cart")) {
        this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
      }
      else {
        this.totalCart =0;
      }
      
    }
    
  }

  gotoDashboard() {
    this.nav.push('DashboardPage');
  }
  gotoProfile() {
    this.nav.push('ProfilePage');
  }
  goback() {
    this.nav.pop();
  }
  gotoEditProfile() {
    this.nav.push('ProfileeditPage');
  }
  gotoViewProfile() {
    this.nav.push('ProfileviewPage');
  }
  gotoWishList() {
    this.nav.push('WishlistPage');
  }
  gotoOrderHistory() {

    this.nav.push('OrderhistoryPage');
  }
  gotoCartPage() {
    this.nav.push('CartPage');
  }
  logOut() {
    this.nav.setRoot('LoginPage');
  }


  
}

