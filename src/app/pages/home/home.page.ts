import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './../../common/services/common.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,private commonService: CommonService,private alertCtrl: AlertController) {}

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
