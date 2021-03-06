import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
// core module
import { CoreModule } from '../../src/core/core.module';
import { EditaddressPage} from '../pages/layout/editaddress/editaddress';


@NgModule({
  declarations: [
    MyApp,
    EditaddressPage
    //HomePage
  ],
  imports: [
    BrowserModule,
    CoreModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditaddressPage
    //HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },


  ]
})
export class AppModule { }
