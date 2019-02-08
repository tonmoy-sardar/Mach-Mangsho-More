import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipelistPage } from './recipelist';

@NgModule({
  declarations: [
    RecipelistPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipelistPage),
  ],
})
export class RecipelistPageModule {}
