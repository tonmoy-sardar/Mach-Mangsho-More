import { Component,NgZone,ViewChild  } from '@angular/core';
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
 * Generated class for the SpendingbarchartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spendingbarchart',
  templateUrl: 'spendingbarchart.html',
})
export class SpendingbarchartPage {
  userId: number;
  whisListProduct: any = [];
  imageBaseUrl: any;
  visibleKey: boolean;
  searchText: string;
  monthList:any=[];
  spendingPattern;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  doughnutChart: any;
  doughnutChartMonth: any;
  isMonthShow:number;
  getSpendingDetails:any;
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
    //this.getLineChart();
    this.getBarChart();
    this.isMonthShow=0;
    this.monthList = [
      {
        'id':'01',
        'name':'Jan'
      },
      {
        'id':'02',
        'name':'Feb'
      },
      {
        'id':'03',
        'name':'March'
      },
      {
        'id':'04',
        'name':'Apr'
      },
      {
        'id':'05',
        'name':'May'
      },
      {
        'id':'06',
        'name':'Jun'
      },
      {
        'id':'07',
        'name':'Jul'
      },
      {
        'id':'08',
        'name':'Aug'
      },
      {
        'id':'09',
        'name':'Sep'
      },
      {
        'id':'10',
        'name':'Oct'
      },
      {
        'id':'11',
        'name':'Nov'
      },
      {
        'id':'12',
        'name':'Dec'
      }
    ]
    
  }

  // getLineChart() {
  //   const data = {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','sep','oct','Nov','Dec'],
  //     datasets: [
  //       {
  //         label: 'My First dataset',
  //         fill: false,
  //         lineTension: 0.1,
  //         backgroundColor: 'rgba(75,192,192,0.4)',
  //         borderColor: 'rgba(75,192,192,1)',
  //         borderCapStyle: 'butt',
  //         borderDash: [],
  //         borderDashOffset: 0.0,
  //         borderJoinStyle: 'miter',
  //         pointBorderColor: 'rgba(75,192,192,1)',
  //         pointBackgroundColor: '#fff',
  //         pointBorderWidth: 1,
  //         pointHoverRadius: 5,
  //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //         pointHoverBorderColor: 'rgba(220,220,220,1)',
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 1,
  //         pointHitRadius: 10,
  //         data: [65, 59, 80, 81, 56, 55, 40,0,0,0,0],
  //         spanGaps: false,
  //       },
  //       {
  //         label: 'My Second dataset',
  //         fill: false,
  //         lineTension: 0.1,
  //         backgroundColor: 'rgba(175,92,192,0.4)',
  //         borderColor: 'rgba(31,156,156,1)',
  //         borderCapStyle: 'butt',
  //         borderDash: [5, 8],
  //         borderDashOffset: 0.0,
  //         borderJoinStyle: 'miter',
  //         pointBorderColor: 'rgba(31,156,156,1)',
  //         pointBackgroundColor: '#fff',
  //         pointBorderWidth: 1,
  //         pointHoverRadius: 5,
  //         pointHoverBackgroundColor: 'rgba(31,156,156,1)',
  //         pointHoverBorderColor: 'rgba(220,220,220,1)',
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 1,
  //         pointHitRadius: 10,
  //         data: [15, 39, 50, 81, 51, 55, 30,0,0,0,0],
  //         spanGaps: false,
  //       },
  //       {
  //         label: 'My Third dataset',
  //         fill: false,
  //         lineTension: 0.1,
  //         backgroundColor: 'rgba(175,92,192,0.4)',
  //         borderColor: 'rgba(31,156,156,1)',
  //         borderCapStyle: 'butt',
  //         borderDash: [5, 8],
  //         borderDashOffset: 0.0,
  //         borderJoinStyle: 'miter',
  //         pointBorderColor: 'rgba(31,156,156,1)',
  //         pointBackgroundColor: '#fff',
  //         pointBorderWidth: 1,
  //         pointHoverRadius: 5,
  //         pointHoverBackgroundColor: 'rgba(31,156,156,1)',
  //         pointHoverBorderColor: 'rgba(220,220,220,1)',
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 1,
  //         pointHitRadius: 10,
  //         data: [1, 30, 59, 60, 15, 30, 2,0,0,0,0],
  //         spanGaps: false,
  //       }
  //     ]
  //   };

  //   return this.getChart(this.lineCanvas.nativeElement, 'line', data);
  // }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }


  getBarChart() {

    this.getSpendingDetails =this.navParams.get('data');
    console.log("Spending details==>",this.getSpendingDetails);
    var categoryNames: any = [];
    var categorySpending: any = [];
    this.getSpendingDetails.forEach(x => {
      categoryNames.push(x.product_category_name);
      categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val:0)

    })
    


    const data = {
      labels: categoryNames,
      datasets: [{
        label: '',
        data: categorySpending,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
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


  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  goBack() {
    this.navCtrl.pop();
  }


}
