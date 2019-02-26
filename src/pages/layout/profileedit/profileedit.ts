import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Platform, Nav, ActionSheetController, LoadingController, Loading } from 'ionic-angular';
import { Events, ToastController } from 'ionic-angular';
import { environment } from '../../../core/global';
import { File } from '@ionic-native/file';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
//Services
import { ProfileService } from '../../../core/services/profile.service';



/**
 * Generated class for the ProfileeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-profileedit',
  templateUrl: 'profileedit.html',
})
export class ProfileeditPage {
  @ViewChild('content') content:any;
  userName: string;
  imageBaseUrl: any;
  userImage: any;
  profileDetails: any = [];
  userId: number;
  isNameShowId: any;
  isEmailShowId: any;
  isContactShowId: any;
  isaddressShowId: any;
  lastImage: any;
  imageURI: any;
  imageFileName: any;
  user_image: any
  loading: any;
  apiUrl: any;
  allAddressList: any = [];
  addressForm: FormGroup;
  addressDetails = {};
  isShowAddressForm: any;
  editAddressId:number;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    private spinnerDialog: SpinnerDialog,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public profileService: ProfileService,
    private crop: Crop
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.apiUrl = environment.apiEndpoint;
    this.userName = localStorage.getItem('userName');
    this.userImage = localStorage.getItem('userImage');
    this.userId = +localStorage.getItem('userId');

    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      address: ["", Validators.required],
      landmark: ["", Validators.required],
      pincode: ["", Validators.required],
    });

  }

  ionViewDidLoad() {
    this.isNameShowId = 0;
    this.isEmailShowId = 0;
    this.isContactShowId = 0;
    // this.isaddressShowId = 0;
    this.getProfileDetails(this.userId);
    this.getmyAddress();
    this.menuCtrl.close();
    this.isShowAddressForm = 0;
  }


  getProfileDetails(id) {
    this.profileService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
      },
      error => {
      }
    )
  }
  ShowSaveButton(field, value) {
    if (field == 'name') {
      this.isNameShowId = value;
    }
    else if (field == 'email') {
      this.isEmailShowId = value;
    }
    else if (field == 'contact') {
      this.isContactShowId = value;
    }
    else {
      this.isNameShowId = 0;
      this.isEmailShowId = 0;
      this.isContactShowId = 0;
    }
  }

  updateProfile(profileDetails) {
    this.userId = +localStorage.getItem('userId');

    this.spinnerDialog.show();
    this.profileService.updateUserProfile(this.userId, profileDetails).subscribe(
      res => {
        this.profileDetails = res['result'];
        this.getProfileDetails(this.userId);
        this.isNameShowId = 0;
        this.isEmailShowId = 0;
        this.isContactShowId = 0;
        localStorage.setItem('userName', this.profileDetails.name);
        this.profileService.updateProfileStatus(true);
        this.spinnerDialog.hide();
        this.presentToast("Profile updated succesfully.");
      },
      error => {
        this.spinnerDialog.hide();
      }
    )

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      allowEdit: true,
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;

      this.uploadImage();
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    // File name only
    var filename = this.lastImage;
    var options = {
      fileKey: "profile_image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, this.apiUrl + 'userprofileimageupdate/' + this.userId, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
      var userUpdateImg = JSON.parse(data.response);
      localStorage.setItem('userImage', userUpdateImg.result.profile_image);
      this.profileService.updateProfileStatus(true);
      this.getProfileDetails(this.userId);
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

  getmyAddress() {
    this.profileService.addressList(this.userId).subscribe(
      res => {
        this.allAddressList = res['result'];
        console.log(this.allAddressList)
      },
      error => {
      }
    )
  }
  isFieldValid(field: string) {
    return !this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.addressForm.get(field).invalid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched),
      'is-valid': this.addressForm.get(field).valid && (this.addressForm.get(field).dirty || this.addressForm.get(field).touched)
    };
  }
  showAddressForm(id) {
    this.editAddressId = id;
    this.profileService.myAddressDetails(id).subscribe(
      res => {
        this.addressDetails = res['result'];
        this.isShowAddressForm = 1;
        console.log(this.allAddressList)
        //this.content.scrollToBottom(300);//300ms animation speed

      },
      error => {
      }
    )
  }

  updatemyAddress() {
    if (this.addressForm.valid) {
      this.spinnerDialog.show();
      this.addressForm.value.customer_id = this.userId;
      this.addressForm.value.state_id = '1';
      console.log(this.addressForm.value);
      this.profileService.updateAddress(this.addressForm.value,this.editAddressId).subscribe(
        res => {
          this.presentToast("Update address succesfully.");
          this.spinnerDialog.hide();
          this.getmyAddress();
          this.isShowAddressForm = 0;
          this.addressForm.reset();
        },
        error => {
          this.presentToast("Error in Address Update");
          this.spinnerDialog.hide();
        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
    }
  }


  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }



}
