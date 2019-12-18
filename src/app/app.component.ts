import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonService } from './common/services/common.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  hasLoggedIn:boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private commonService: CommonService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
    this.commonService.hasLoggedIn.subscribe(flag => {
      console.log("Has user Logged In: " + flag);
      this.hasLoggedIn = flag;
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.commonService.hasLoggedIn.next(this.hasLoggedIn);
    });
  }
  logOutUser(){
    this.alertCtrl.create({
      header:'Log Out',
      message: 'You have been logged out',
      buttons:[
        {
          text: 'Ok',
          handler: ()=>{
            this.router.navigate(['/login']);
            this.commonService.hasLoggedIn.next(false);
          }
        }
      ]
    }).then(alertEl =>{
      alertEl.present(); 
    });
    
  }
}
