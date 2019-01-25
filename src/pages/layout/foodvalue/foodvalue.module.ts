import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodvaluePage } from './foodvalue';

@NgModule({
  declarations: [
    FoodvaluePage,
  ],
  imports: [
    IonicPageModule.forChild(FoodvaluePage),
  ],
})
export class FoodvaluePageModule {}
