import { NgModule } from '@angular/core';
import { ApiProvider } from '../core/api/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Crop } from '@ionic-native/crop/ngx';
import { SocialSharing } from '@ionic-native/social-sharing';
//services
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { ProfileService } from './services/profile.service';
import { ForgotpasswordService } from './services/forgotpassword.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';


@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ionicGalleryModal.GalleryModalModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],
  providers: [
    ApiProvider,
    File,
    Transfer,
    Camera,
    FilePath,
    SpinnerDialog,
    LoginService,
    SignupService,
    ProfileService,
    ForgotpasswordService,
    ProductService,
    CartService,
    SpeechRecognition,
    Crop,
    SocialSharing,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
  ]
})
export class CoreModule {

}