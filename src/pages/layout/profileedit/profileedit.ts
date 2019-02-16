import { Component } from '@angular/core';
//import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { IonicPage, NavController, MenuController, NavParams, Platform, Nav, ActionSheetController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
// For camera 
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path';
// import { Camera, CameraOptions } from '@ionic-native/camera';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop/ngx';
//Services
import { ProfileService } from '../../../core/services/profile.service';



/**
 * Generated class for the ProfileeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
//declare const FilePath: any;
@IonicPage()
@Component({
  selector: 'page-profileedit',
  templateUrl: 'profileedit.html',
})
export class ProfileeditPage {
  userName: string;
  imageBaseUrl: any;
  userImage: any;
  profileDetails: any = [];
  userId: number;
  isShowId: any;
  lastImage: any;

  imageURI: any;
  imageFileName: any;
  user_image: any
  loading: any;
  apiUrl: any;



  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    // private transfer: FileTransfer,
    // private camera: Camera,
    // private file: File,
    // private filePath: FilePath,
    // public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
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
    this.getProfileDetails(this.userId);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileeditPage');
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
  ShowSaveButton(id) {
    this.isShowId = id;
  }
  updateProfile(profileDetails) {
    this.userId = +localStorage.getItem('userId');
    console.log(profileDetails);
    this.profileService.updateUserProfile(this.userId, profileDetails).subscribe(
      res => {
        this.profileDetails = res['result'];

        console.log("Profile Details ==>", this.profileDetails);
        this.getProfileDetails(this.userId);
        this.isShowId = 0;
        localStorage.setItem('userName', this.profileDetails.name);
        this.profileService.updateProfileStatus(true);
      },
      error => {
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
      quality: 100,
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


}
