import { Component } from '@angular/core';
//import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { IonicPage, NavController, MenuController, NavParams, Platform, Nav, ActionSheetController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { environment } from '../../../core/global';
// For camera 
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private transfer: FileTransfer,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
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

      console.log("New File ==> ", this.lastImage);
      //alert(localStorage.getItem('authID'));
      this.uploadImage(this.userId);
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



  // public uploadImage(id) {
  //   // Destination URL
  //   var url = "http://192.168.24.95:8080/mach_mangso_more/api/userprofileimageupdate/30";

  //   if (this.lastImage) {
  //     var targetPath = this.pathForImage(this.lastImage);
  //     var filename = this.lastImage;
  //     var options = {
  //       fileKey: "photo",
  //       photo: filename,
  //       chunkedMode: false,
  //       mimeType: "multipart/form-data",
  //       params: {
  //         'profile_image': filename,
  //         //'user_id': JSON.parse(localStorage.getItem('authID'))
  //       }
  //       // params : {'fileName': filename}
  //     };
  //     console.log("OPTIONS", options);
  //     const fileTransfer: FileTransferObject = this.transfer.create();
  //     this.loading = this.loadingCtrl.create({
  //       content: 'Uploading...',
  //     });
  //     this.loading.present();
  //     console.log("Target Path", targetPath);
  //     // Use the FileTransfer to upload the image
  //     fileTransfer.upload(targetPath, url, options).then(data => {
  //       console.log('UPLOADDDD123', data);
  //       var userUpdate = JSON.parse(data.response);
  //       //   console.log(userUpdate.user_image);
  //       //
  //       // localStorage.setItem('login_user_image', userUpdate.user_image);
  //       // this.user_image = localStorage.getItem('login_user_image')
  //       // this.getProfileDetails();

  //       this.loading.dismissAll()
  //       this.presentToast('Image succesfully uploaded.');
  //       // this.navCtrl.push('HomePage');
  //     }, err => {
  //       console.log("Error", err);
  //       this.loading.dismissAll()
  //       this.presentToast('Error while uploading file.');
  //     });


  //   }

  // }

  public uploadImage(id) {
    // Destination URL
    //var url = "http://192.168.24.95:8080/mach_mangso_more/api/userprofileimageupdate/30";

    if (this.lastImage) {
      var targetPath = this.pathForImage(this.lastImage);
      var filename = this.lastImage;
      var options = {
        fileKey: "photo",
        photo: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: {
          'profile_image': filename,
          //'user_id': JSON.parse(localStorage.getItem('authID'))
        }
        // params : {'fileName': filename}
      };
      console.log("OPTIONS", options);
      const fileTransfer: FileTransferObject = this.transfer.create();
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
      console.log("Target Path", targetPath);
      // Use the FileTransfer to upload the image
      // fileTransfer.upload(targetPath, url, options).then(data => {
      //   console.log('UPLOADDDD123', data);
      //   var userUpdate = JSON.parse(data.response);
      //   //   console.log(userUpdate.user_image);
      //   //
      //   // localStorage.setItem('login_user_image', userUpdate.user_image);
      //   // this.user_image = localStorage.getItem('login_user_image')
      //   // this.getProfileDetails();

      //   this.loading.dismissAll()
      //   this.presentToast('Image succesfully uploaded.');
      //   // this.navCtrl.push('HomePage');
      // }, err => {
      //   console.log("Error", err);
      //   this.loading.dismissAll()
      //   this.presentToast('Error while uploading file.');
      // });
      let body = new FormData();
      body.append('profile_image', filename);
        this.profileService.updateUserImage(this.userId,body,options).subscribe(
          res => {
            console.log(res);
            this.profileDetails = res['result'];
            console.log("Profile Details ==>", this.profileDetails);
            this.getProfileDetails(this.userId);
            this.isShowId = 0;
          },
          error => {
          }
        )
        
  
    }

  }


}
