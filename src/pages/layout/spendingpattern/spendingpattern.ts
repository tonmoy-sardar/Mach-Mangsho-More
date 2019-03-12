import { Component,NgZone,ViewChild  } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { environment } from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ProductService } from '../../../core/services/product.service';

import { Chart } from 'chart.js';
/**
 * Generated class for the SpendingpatternPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spendingpattern',
  templateUrl: 'spendingpattern.html',
})
export class SpendingpatternPage {
  userId: number;
  whisListProduct: any = [];
  imageBaseUrl: any;
  visibleKey: boolean;
  searchText: string;
  spendingPattern;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public alertCtrl: AlertController,
    private speechRecognition: SpeechRecognition,
    private platform: Platform,
    private zone: NgZone,
    public productService: ProductService
  ) {
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.searchText == '';
    this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    this.visibleKey = false;
    this.menuCtrl.close();
    this. getSpendingPattern(this.userId);
  }


  getSpendingPattern(userId)
  {
    this.spinnerDialog.show();
    this.productService.getSpendingPattern(userId).subscribe(
      res => {
        this.spendingPattern = res['result'];
        this.visibleKey = true;
        var categoryNames: any = [];
        var categorySpending: any = [];
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val:0)
        })


        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

          type: 'doughnut',
          data: {
              labels: categoryNames,
             
              datasets: [{
                label: '# of Votes',
                data: categorySpending,
                backgroundColor: [
                    '#ff9980',
                    '#74bff1',
                    '#ffdb80',
                    '#ff809b',
                    '#80ffff'
                ],
                hoverBackgroundColor: [
                    "#cc2900",
                    "#1068a2",
                    "#ffb700",
                    "#e60032",
                    "#00b3b3"
                ]
            }]
          }
    
      });

        console.log(this.spendingPattern);

        this.spinnerDialog.hide();
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  }
  


  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
