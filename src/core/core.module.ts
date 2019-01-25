import { NgModule} from '@angular/core';
// Import ionic2-rating module
//import { Ionic2RatingModule } from 'ionic2-rating';
import { ApiProvider} from '../core/api/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//services
import {LoginService} from './services/login.service';
import {SignupService} from './services/signup.service';
import {ProfileService} from './services/profile.service';

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
    LoginService,
    SignupService,
    ProfileService
  ]
})
export class CoreModule {
 
}