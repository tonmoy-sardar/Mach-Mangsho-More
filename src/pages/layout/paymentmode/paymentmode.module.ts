import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentmodePage } from './paymentmode';
//import { CartdetailsbannerPage } from '../cartdetailsbanner/cartdetailsbanner';
//import {CoreModule} from '../../../core/core.module';
@NgModule({
  declarations: [
    PaymentmodePage,
    //CartdetailsbannerPage
  //  CoreModule
  ],
  imports: [
    IonicPageModule.forChild(PaymentmodePage),
  ],
})
export class PaymentmodePageModule {}
