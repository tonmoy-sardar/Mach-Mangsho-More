import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderdetailsPage } from './orderdetails';

@NgModule({
  declarations: [
    OrderdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderdetailsPage),
  ],
})
export class OrderdetailsPageModule {}
