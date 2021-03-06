import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Alert } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { GalleryModal } from 'ionic-gallery-modal';
import { environment } from '../../../core/global';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

@IonicPage({ segment: 'productdetails/:id' })
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  rangeValue: any;
  proDetails: any = {};
  imageBaseUrl: any;
  customer_cart_data: any;
  userId: any;
  totalOurPrice: any;
  totalMarketPrice: any;
  totalSavings: any;
  photo: any;
  foodValueList: any;
  private photos: any[] = [];
  visibleKey: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public modalCtrl: ModalController,
    private spinnerDialog: SpinnerDialog,
    public productService: ProductService,
    public cartService: CartService
  ) {
    this.imageBaseUrl = environment.imageBaseUrl;
    //Header Show Hide Code 
    events.publish('hideHeader', { isHeaderHidden: false, isSubHeaderHidden: false });
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }
    else {
      this.userId = '';
    }
    this.rangeValue = 1;
    // if (sessionStorage.getItem("cart")) {
    //   this.customer_cart_data = JSON.parse(sessionStorage.getItem("cart"));
    // }
    // else {
    //   this.customer_cart_data = [];
    // }
  }

  ionViewDidLoad() {
    
  }
  ionViewWillEnter() {
    console.log(123);
    if (sessionStorage.getItem("cart")) {
      this.customer_cart_data = JSON.parse(sessionStorage.getItem("cart"));
    }
    else {
      this.customer_cart_data = [];
    }
    this.productDetails(this.navParams.get('id'));

    this.getFoodValueList(this.navParams.get('id'));
  }

  productDetails(id) {
    this.spinnerDialog.show();
    this.productService.getProductDetails(id, this.userId).subscribe(
      res => {
        this.proDetails = res['result']['productlist'];

        this.proDetails.totalOurPrice = this.rangeValue * this.proDetails.price;
        this.proDetails.totalMarketPrice = this.rangeValue * this.proDetails.market_price;
        this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;

        var index = this.customer_cart_data.findIndex(y => y.product_id == this.proDetails.id && y.customer_id == this.userId);

        if (index != -1) {
          this.proDetails.isCart = true;
          this.proDetails.quantity = this.customer_cart_data[index].quantity;
        }
        else {
          this.proDetails.isCart = false;
          this.proDetails.quantity = 0;
        }
        this.visibleKey = true;
        this.spinnerDialog.hide();
      },
      error => {
        this.visibleKey = true;
        this.spinnerDialog.hide();
      }
    )
  }

  changeRangeValue(value, proDetailss) {
    this.proDetails.quantity = value._value;
    this.proDetails.totalOurPrice = value._value * proDetailss.price;
    this.proDetails.totalMarketPrice = value._value * proDetailss.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;
  }
  addtoCart(item) {
    var data = {
      customer_id: this.userId,
      product_id: item.id,
      product_name: item.name,
      description: item.description,
      price: item.price,
      market_price: item.market_price,
      quantity_count: item.quantity_count,
      unit: item.unit,
      image_small: item.image_small,
      quantity: item.quantity + 1,
      totalOurPrice: item.totalOurPrice,
      totalMarketPrice: item.totalMarketPrice,
      totalSavings: item.totalSavings
    }
    var index = this.customer_cart_data.findIndex(y => y.product_id == item.id && y.customer_id == this.userId);
    this.proDetails.isCart = true;
    this.proDetails.quantity = item.quantity + 1;
    if (index == -1) {
      this.customer_cart_data.push(data);
      this.setCartData();
    }
    this.cartService.cartNumberStatus(true);
  }

  buyNow(item) {
      var data = {
        customer_id: this.userId,
        product_id: item.id,
        product_name: item.name,
        description: item.description,
        price: item.price,
        market_price: item.market_price,
        quantity_count: item.quantity_count,
        unit: item.unit,
        image_small: item.image_small,
        quantity: item.quantity + 1,
        totalOurPrice: item.totalOurPrice,
        totalMarketPrice: item.totalMarketPrice,
        totalSavings: item.totalSavings
      }
      var index = this.customer_cart_data.findIndex(y => y.product_id == item.id && y.customer_id == this.userId);
        this.proDetails.isCart = true;
      console.log(index);
      if (index == -1) {
        this.proDetails.quantity = item.quantity+1;
        this.customer_cart_data.push(data);
        this.setCartData();
        this.cartService.cartNumberStatus(true);
        this.navCtrl.push('CartPage');
      }
      else {
        this.navCtrl.push('CartPage');
      }
  }

  setCartData() {
    sessionStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }

  RemoveCart(item) {
    var index = this.customer_cart_data.findIndex(y => y.product_id == item.id && y.customer_id == this.userId);
    if (index != -1) {
      this.customer_cart_data.splice(index, 1);
      this.setCartData();
    }
    if (this.proDetails['id'] == item.id) {
      this.proDetails.isCart = false;
      this.proDetails.quantity = 1;
    }
    this.cartService.cartNumberStatus(true);
  }

  decrement(product_details) {
    var index;
    if (product_details.quantity > 1) {
      index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
      if (index != -1) {
        this.customer_cart_data[index].quantity = product_details.quantity - 1;
        this.setCartData();
      }
      
      this.proDetails['quantity'] = product_details.quantity - 1;
      if (this.proDetails['quantity'] == 0) {
       
        index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
        if (index != -1) {
          this.customer_cart_data.splice(index, 1);
          this.setCartData();
        }
        this.proDetails.isCart = false;
      }
      this.proDetails.totalOurPrice = this.proDetails.quantity * product_details.price;
    this.proDetails.totalMarketPrice = this.proDetails.quantity * product_details.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;
    }
    else {
      index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
      if (index != -1) {
        this.customer_cart_data.splice(index, 1);
        this.setCartData();
      }

      this.proDetails.isCart = false;
      console.log(this.proDetails);
      this.proDetails.quantity = product_details.quantity - 1;
      this.proDetails.totalOurPrice = product_details.price;
    this.proDetails.totalMarketPrice = product_details.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;

    }
    console.log(this.proDetails);
    
    this.cartService.cartNumberStatus(true);

  }
  increment(product_details) {
    var index = this.customer_cart_data.findIndex(y => y.product_id == product_details.id && y.customer_id == this.userId);
    if (index != -1) {
      this.customer_cart_data[index].quantity = product_details.quantity + 1;
      this.setCartData();
    }
    this.proDetails.quantity = product_details.quantity + 1
    this.proDetails.totalOurPrice = this.proDetails.quantity * product_details.price;
    this.proDetails.totalMarketPrice = this.proDetails.quantity * product_details.market_price;
    this.proDetails.totalSavings = this.proDetails.totalMarketPrice - this.proDetails.totalOurPrice;
    this.cartService.cartNumberStatus(true);
  }

  gotoFoodValue(id) {
    this.navCtrl.push('FoodvaluePage', { id: id });
  }
  gotoRecipe(id) {
    this.navCtrl.push('RecipelistPage', { id: id });
  }
  gotoTrivia(id) {
    this.navCtrl.push('TriviaPage', { id: id });
  }

  getFoodValueList(id) {
    this.spinnerDialog.show();
    this.productService.getFoodList(id).subscribe(res => {
      this.foodValueList = res['result'];
      this.photos.push({
        url: this.imageBaseUrl + this.foodValueList.food_value_large,
      });
      this.spinnerDialog.hide();
    },
      error => { this.spinnerDialog.hide(); })
  }

  private openModal() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: 0, // The second image
    });
    modal.present();
  }

  goBack() {
    this.navCtrl.pop();
  }
}
