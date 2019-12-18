import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  navigateToLogin(){
    this.alertCtrl.create({
      header:'Success',
      message: 'Registration done. Please login',
      buttons:[
        {
          text: 'Ok',
          handler: ()=>{
            this.router.navigate(['/login']);
          }
        }
      ]
    }).then(alertEl =>{
      alertEl.present(); 
    });    
  }
}
