import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { environment } from '../../../core/global';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ProductService } from '../../../core/services/product.service';

import { Chart } from 'chart.js';
import { v } from '@angular/core/src/render3';

/**
 * Generated class for the PricetrendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage({ segment: 'pricetrend/:id' })
@Component({
  selector: 'page-pricetrend',
  templateUrl: 'pricetrend.html',
})
export class PricetrendPage {
  userId: number;
  whisListProduct: any = [];
  imageBaseUrl: any;
  visibleKey: boolean;
  searchText: string;
  monthList: any = [];
  spendingPattern;
  @ViewChild('barCanvas') barCanvas;
  doughnutChart: any;
  doughnutChartMonth: any;
  isMonthShow: number;
  trendDetails:any ={};
  priceStatus:any;
  priceTrend:any;

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
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    this.imageBaseUrl = environment.imageBaseUrl;
    this.userId = +localStorage.getItem('userId');
    this.searchText == '';
    this.userId = +localStorage.getItem('userId');
  }

  ionViewDidLoad() {
    this.visibleKey = false;
    this.menuCtrl.close();
    //this.getBarChart();
    this.getPriceTrendChart(this.navParams.get('id'));
    this.priceTrendDetails(this.navParams.get('id'));
    this.isMonthShow = 0;
    // var d = new Date();
    // var n = d.getFullYear();
    //alert(new Date().getFullYear().toString().substr(-2));
    var currentYear = new Date().getFullYear().toString().substr(-2);
    this.monthList = [
      {
        'id': '01',
        'name': 'Jan'+currentYear
      },
      {
        'id': '02',
        'name': 'Feb'+currentYear
      },
      {
        'id': '03',
        'name': 'March'
      },
      {
        'id': '04',
        'name': 'Apr'
      },
      {
        'id': '05',
        'name': 'May'
      },
      {
        'id': '06',
        'name': 'Jun'
      },
      {
        'id': '07',
        'name': 'Jul'
      },
      {
        'id': '08',
        'name': 'Aug'
      },
      {
        'id': '09',
        'name': 'Sep'
      },
      {
        'id': '10',
        'name': 'Oct'
      },
      {
        'id': '11',
        'name': 'Nov'
      },
      {
        'id': '12',
        'name': 'Dec'
      }
    ]

  }

 

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }

  getBarChart() {
    const data = {
      datasets: [{
        label: 'Bar Dataset',
        data: [10, 20, 70, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      }, {
        label: 'Line Dataset',
        data: [10, 20, 70, 40],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        // Changes this dataset to become a line
        type: 'line'
      }],


      labels: ['January', 'February', 'March', 'April'],
    };
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }


  getPriceTrendChart(id){ 
    this.spinnerDialog.show();
    this.productService.getProductSpendAllMonth(id).subscribe(
      res => {
        this.priceTrend = res['result'];  
        console.log("priceTrend==>",this.priceTrend);
        this.visibleKey = true;
        //  var monthNames: any = [];
        // var monthsSpending: any = [];
        var monthNames = Object.keys(this.priceTrend);
       // var monthsSpending = Object.values(this.priceTrend);
        console.log("Month Name",monthNames);
        var monthsSpending = Object.keys(this.priceTrend).map(key => this.priceTrend[key]);
        //const commaJoinedValues = values.join(",");
        console.log("Hello==>",monthsSpending);
        setTimeout( () => { 
          const data = {
            datasets: [{
              label: 'Bar Dataset',
              data: monthsSpending,
              backgroundColor: [
                'rgba(0,51,255,0.2)',
                'rgba(204,51,102,0.2)',
                'rgba(255,0,255,0.2)',
                'rgba(0,102,51,0.2)',
                'rgba(153,204,102,0.2)',
                'rgba(153,51,153,0.2)',
                'rgba(0,204,255,0.2)',
                'rgba(51,204,51,0.2)',
                'rgba(204,51,0,0.2)',
                'rgba(51,51,102,0.2)',
                'rgba(255,153,51,0.2)',
                'rgba(255,0,255,0.2)',
              ],
              borderColor: [
                'rgba(0,51,255,0.2)',
                'rgba(204,51,102,0.2)',
                'rgba(255,0,255,0.2)',
                'rgba(0,102,51,0.2)',
                'rgba(153,204,102,0.2)',
                'rgba(153,51,153,0.2)',
                'rgba(0,204,255,0.2)',
                'rgba(51,204,51,0.2)',
                'rgba(204,51,0,0.2)',
                'rgba(51,51,102,0.2)',
                'rgba(255,153,51,0.2)',
                'rgba(255,0,255,0.2)',
              ],
            }, {
              label: 'Line Dataset',
              data: monthsSpending,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
              // Changes this dataset to become a line
              type: 'line'
            }],
      
      
            labels: monthNames,
          };
          const options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          };
      
          return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
        }, 3000 );

        this.spinnerDialog.hide();
  
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  }













  priceTrendDetails(id) {
    this.productService.getPriceTrendDetails(id).subscribe(
      res => {
        console.log("Price Trend==>",res);
        this.trendDetails = res['result'];
       if(this.trendDetails.todays_price > this.trendDetails.last_day_price) {
        this.priceStatus =1;
       }
       else if(this.trendDetails.todays_price < this.trendDetails.last_day_price) {
        this.priceStatus =2;
       }
       else {
        this.priceStatus =3;
       }

        this.visibleKey = true;
      },
      error => {
        this.visibleKey = true;
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
