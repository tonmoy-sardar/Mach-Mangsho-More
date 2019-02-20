import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { environment } from '../../../core/global';
import { ProfileService } from '../../../core/services/profile.service';

/**
 * Generated class for the ProfileviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileview',
  templateUrl: 'profileview.html',
})
export class ProfileviewPage {
  userId: number;
  imageBaseUrl: any;
  profileDetails: any = [];
  public buttonClicked: boolean = false;
  allAddressList: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private spinnerDialog: SpinnerDialog,
    public profileService: ProfileService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.getProfileDetails(this.userId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileviewPage');
    this.menuCtrl.close();
  }

  getProfileDetails(id) {
    this.profileService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
        console.log("Profile Details ==>", this.profileDetails);
      },
      error => {
      }
    )
  }
  onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
    this.spinnerDialog.show();
    this.profileService.addressList(this.userId).subscribe(
      res => {
        this.allAddressList = res['result'];
        this.spinnerDialog.hide();
      },
      error => {
        this.spinnerDialog.hide();
      }
    )
  }

}
