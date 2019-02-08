import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

//Services
import { ProfileService } from '../../../core/services/profile.service';
/**
 * Generated class for the MyaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaddress',
  templateUrl: 'myaddress.html',
})
export class MyaddressPage {
  userId:number;
  allAddressList:any =[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private spinnerDialog: SpinnerDialog,
    public profileService: ProfileService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaddressPage');
    this.myAddressList(this.userId);
  }

  myAddressList(id) {
    this.spinnerDialog.show();
    this.profileService.addressList(id).subscribe(
      res => {
       this.allAddressList = res['result'];
       console.log("Address List ==>", this.allAddressList);
       this.spinnerDialog.hide();
      },
      error => {
      }
    )
  }
  gotoPage() {
    this.navCtrl.push('DeliveryslotPage');
  }

}
