import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentmodePage } from './paymentmode';

@NgModule({
  declarations: [
    PaymentmodePage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentmodePage),
  ],
})
export class PaymentmodePageModule {}
