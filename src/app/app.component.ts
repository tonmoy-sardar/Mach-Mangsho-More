import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { environment } from '../core/global';
import { LoginService } from '../core/services/login.service';
import { ProfileService } from '../core/services/profile.service';
import { CartService } from '../core/services/cart.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loggedIn: boolean;
  userName: string;
  imageBaseUrl: any;
  userImage: any;
  totalCart: any;
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  topHeaderIsHidden: boolean;
  subHeaderIsHidden: boolean;
  backHide:boolean;
  backButtonIsHidden:boolean;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public events: Events,
    public loginService: LoginService,
    public cartService: CartService,
    public profileService: ProfileService
  ) {
    this.presentLoadingCustom();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      //statusBar.backgroundColorByHexString('#fff');
      splashScreen.hide();
      this.rootPage = 'HomePage';
     // this.backHide =true;
    });
    cartService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
    events.subscribe('hideHeader', (data) => {
      console.log("Header Data ==>", data);
      this.topHeaderIsHidden = data.isHeaderHidden;
      this.subHeaderIsHidden = data.isSubHeaderHidden;
      this.backButtonIsHidden = data.backButtonHidden;
    })

    this.imageBaseUrl = environment.imageBaseUrl;
    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
    profileService.getProfileUpdateStatus.subscribe(status => this.updateStatus(status));
    if (sessionStorage.getItem("cart")) {
      this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
    }
    else {
      this.totalCart = 0;
    }
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.userImage = localStorage.getItem('userImage');
    }
    else {
      this.loggedIn = false;
      this.userName = 'Guest';
      this.userImage = '';
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

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  private updateStatus(status: boolean) {
    if (status) {
      this.userName = localStorage.getItem('userName');
      this.userImage = localStorage.getItem('userImage');
    }
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.userImage = localStorage.getItem('userImage');
    }
    else {
      this.loggedIn = false;
      this.userName = 'Guest';
      this.userImage = '';
    }
  }

  cartNumberStatus(status: boolean) {
    if (status) {
      if (sessionStorage.getItem("cart")) {
        this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
      }
      else {
        this.totalCart = 0;
      }
    }
  }

  gotoPage(page) {
    this.nav.push(page);
  }

  goback() {
    this.nav.pop();
  }

  logOut() {
    localStorage.clear();
    this.loadUserInfo();
    this.nav.setRoot('LoginPage');
  }

}

