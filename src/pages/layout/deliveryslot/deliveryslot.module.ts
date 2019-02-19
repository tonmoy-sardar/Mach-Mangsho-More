import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryslotPage } from './deliveryslot';
import { CartdetailsbannerPage } from '../cartdetailsbanner/cartdetailsbanner';
//import { CoreModule } from '../../../core/core.module';

@NgModule({
  declarations: [
    DeliveryslotPage,
   // CartdetailsbannerPage
   //CoreModule
  ],
  imports: [
    IonicPageModule.forChild(DeliveryslotPage),
  ],
})
export class DeliveryslotPageModule {}
