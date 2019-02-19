import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllrecipelistPage } from './allrecipelist';

@NgModule({
  declarations: [
    AllrecipelistPage,
  ],
  imports: [
    IonicPageModule.forChild(AllrecipelistPage),
  ],
})
export class AllrecipelistPageModule {}
