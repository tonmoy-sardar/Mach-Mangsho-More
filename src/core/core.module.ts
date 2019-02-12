import { NgModule } from '@angular/core';
// Import ionic2-rating module
//import { Ionic2RatingModule } from 'ionic2-rating';
import { ApiProvider } from '../core/api/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//For camera use
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path';
// import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

 import { DocumentViewer,DocumentViewerOptions  } from '@ionic-native/document-viewer/ngx';
 import { SpinnerDialog } from '@ionic-native/spinner-dialog';




//services
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { ProfileService } from './services/profile.service';
import { ForgotpasswordService } from './services/forgotpassword.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';


@NgModule({
  imports: [
    // Ionic2RatingModule 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // Ionic2RatingModule 
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],
  providers: [
    ApiProvider,
    // FileTransfer,
    // FileTransferObject,
    // File,
    // FilePath,
    // Camera,
    File,
    Transfer,
    Camera,
    FilePath,
    DocumentViewer,
    SpinnerDialog,
    LoginService,
    SignupService,
    ProfileService,
    ForgotpasswordService,
    ProductService,
    CartService
  ]
})
export class CoreModule {

}