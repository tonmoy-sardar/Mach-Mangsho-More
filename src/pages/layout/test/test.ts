
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as $ from "jquery";

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var jQuery: any;
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private socialSharing: SocialSharing
    ) {
  }

  ionViewDidLoad() {
    jQuery('.rotating-slider').rotatingSlider({
      slideHeight : Math.min(360, window.innerWidth -80),
      slideWidth : Math.min(480, window.innerWidth - 80),
    });

  // $(document).ready(function () {
  //   $('.wheel').circleMenu({
  //     lockDirection: true,
  //     dragMouse: true,
  //     dragTouch: true
  //   });
  // });

   
    // console.log('ionViewDidLoad TestPage');
    // $(document).ready(function(ev) {
    //   var toggle = $('#ss_toggle');
    //   var menu = $('#ss_menu');
    //   var rot;
      
    //   $('#ss_toggle').on('click', function(ev) {
    //     rot = parseInt($(this).data('rot')) - 180;
    //     menu.css('transform', 'rotate(' + rot + 'deg)');
    //     menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
    //     if ((rot / 180) % 2 == 0) {
    //       //Moving in
    //       toggle.parent().addClass('ss_active');
    //       toggle.addClass('close');
    //     } else {
    //       //Moving Out
    //       toggle.parent().removeClass('ss_active');
    //       toggle.removeClass('close');
    //     }
    //     $(this).data('rot', rot);
    //   });
    
    //   menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    //     if ((rot / 180) % 2 == 0) {
    //       $('#ss_menu div i').addClass('ss_animate');
    //     } else {
    //       $('#ss_menu div i').removeClass('ss_animate');
    //     }
    //   });
      
    // });
  }


//   shareWhatsapp() {
//     alert(1);
//     this.socialSharing.shareViaWhatsApp('This is Testing message share in whatsapp', 'http://132.148.130.125/mach_mangso_more/uploads/product_images/image_large/1548928909images1.jpg', '').then(() => {
//       // Success!
//     }).catch(() => {
//       // Error!
//     });
//   }

//   shareFacebook() {
//     this.socialSharing.shareViaFacebook('This is Testing message share in facebook', '', '').then(() => {
//       // Success!
//       console.log("success");
//     }).catch(() => {
//       // Error!
//       console.log("Error");
//     });
//   }
//   shareEmail() {
//   this.socialSharing.canShareViaEmail().then(() => {
//     // Sharing via email is possible
//   }).catch(() => {
//     // Sharing via email is not possible
//   });
// }

// shareInfo()
// {
// this.socialSharing.share('This is Testing message share in whatsapp', 'http://132.148.130.125/mach_mangso_more/uploads/product_images/image_large/1548928909images1.jpg', 'http://www.banaoapp.com/').
// then(() => {
// // Success!
// }).catch(() => {
// // Error!
// alert("Share failed");
// });
// }

  
}
