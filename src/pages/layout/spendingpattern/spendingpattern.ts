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
  monthList:any=[];
  spendingPattern;
  quarterly:any =[];
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnutCanvasMonth') doughnutCanvasMonth;
  @ViewChild('doughnutCanvasQuater') doughnutCanvasQuater;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  doughnutChart: any;
  doughnutChartMonth: any;
  doughnutChartQuater: any;
  isMonthShow:number;
  isQuaterShow:number;
  selectedMonth:any;
  selectedQuater:any;
  totalQuater:any;
  totalQuaterSum:any;
  CatSpendPrice:any;
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
    //this.getLineChart();
    //this.getBarChart();
    this.isMonthShow=0;
    this.quarterly = [
      {
        'id':'3',
        'name':'3 Months'
      },
      {
        'id':'6',
        'name':'6 Months'
      },
      {
        'id':'12',
        'name':'12 Months'
      },
    ];
    this.monthList = [
      {
        'id':'01',
        'name':'January'
      },
      {
        'id':'02',
        'name':'February'
      },
      {
        'id':'03',
        'name':'March'
      },
      {
        'id':'04',
        'name':'April'
      },
      {
        'id':'05',
        'name':'May'
      },
      {
        'id':'06',
        'name':'June'
      },
      {
        'id':'07',
        'name':'July'
      },
      {
        'id':'08',
        'name':'August'
      },
      {
        'id':'09',
        'name':'September'
      },
      {
        'id':'10',
        'name':'October'
      },
      {
        'id':'11',
        'name':'November'
      },
      {
        'id':'12',
        'name':'December'
      }
    ]
    
  }


  getSpendingPattern(userId)
  {
    this.spinnerDialog.show();
    this.productService.getSpendingPattern(userId).subscribe(
      res => {
        this.spendingPattern = res['result'];
      
        console.log(this.spendingPattern);
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

  // getChart(context, chartType, data, options?) {
  //   return new Chart(context, {
  //     data,
  //     options,
  //     type: chartType,
  //   });
  // }


  // getBarChart() {
  //   const data = {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   };

  //   const options = {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   };

  //   return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  // }


  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  getMonth(data) {
    console.log(data);
  }

  gotoBarChart() {
    this.navCtrl.push('SpendingbarchartPage');
  }

  selectMonth(data){ 
    console.log("Selected Month", data); 
    this.selectedMonth =data.name;
    this.spinnerDialog.show();
    this.productService.getSpendingPatternMonthWise(this.userId,data.id).subscribe(
      res => {
        this.isMonthShow =1;
        this.spendingPattern = res['result'];  
        console.log(this.spendingPattern);
        this.visibleKey = true;
        var categoryNames: any = [];
        var categorySpending: any = [];
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val:0)
        })

        setTimeout( () => { 
          this.doughnutChartMonth = new Chart(this.doughnutCanvasMonth.nativeElement, {

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
        }, 3000 );
  
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  } 

  selectQuater(data) {
    console.log("Select Quater",data)
    this.spinnerDialog.show();
    this.selectedQuater = data.name;
    this.productService.getSpendingPatternQuater(this.userId,data.id).subscribe(
      res => {
        this.isQuaterShow =1;
        this.spendingPattern = res['result'];  
        console.log("Quaterly==>",this.spendingPattern);
        this.visibleKey = true;
        var categoryNames: any = [];
        var categorySpending: any = [];
        this.totalQuaterSum =0;
        this.spendingPattern.forEach(x => {
          categoryNames.push(x.product_category_name);
          console.log("zz",parseFloat(x.order_details.total_price_val));
          this.CatSpendPrice = parseFloat(x.order_details.total_price_val);
          if(isNaN(this.CatSpendPrice)) {
            this.CatSpendPrice =0;
          }
          // categorySpending.push(x.order_details.total_price_val != null ? x.order_details.total_price_val:0);
          categorySpending.push(this.CatSpendPrice);
        })
        console.log(categorySpending);
        const sum = categorySpending.reduce((partial_sum, a) => partial_sum + a); 
        this.totalQuaterSum  = sum;
        console.log("Sum==>",this.totalQuaterSum); 
        setTimeout( () => { 
          this.doughnutChartQuater = new Chart(this.doughnutCanvasQuater.nativeElement, {

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
        }, 3000 );
  
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  }
}
