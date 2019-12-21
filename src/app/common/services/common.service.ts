import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Order } from './../../common/models/order.model';
import { tap, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  appLoadingCtrl;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  hasLoggedIn = new Subject<boolean>(); 

  generateChecksum(orderDetails): Observable<any>{
    const url = 'https://samrat-nodejs-apis.herokuapp.com/generate_checksum';
    // const url = 'https://e0s5foto18.execute-api.ap-south-1.amazonaws.com/dev/dabadigo/core/paytm/createchecksum';
    console.log("requestBody: " + JSON.stringify(orderDetails));
    return this.http.post(url, orderDetails).pipe(
      tap(resData => {
        console.log(resData);
      }),
      retry(0),
      catchError(this.handleError)
    );
  }

  verifyChecksum(orderDetails): Observable<any>{
    const url = 'https://samrat-nodejs-apis.herokuapp.com/verify_checksum';
    // const url = 'https://e0s5foto18.execute-api.ap-south-1.amazonaws.com/dev/dabadigo/core/paytm/createchecksum';
    console.log("requestBody: " + JSON.stringify(orderDetails));
    return this.http.post(url, orderDetails).pipe(
      tap(resData => {
        console.log(resData);
      }),
      retry(0),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
     // client-side error
     errorMessage = `Error: ${error.error.message}`;
   } else {
     // server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   console.log(`${errorMessage}`);
   return throwError(`${error.message}`);
  }

  async showLoading(text){
    let msg;
    if(text){
      msg = text + '...';
    } else{
      msg = 'Please wait...';
    }    
    this.appLoadingCtrl = await this.loadingController.create({
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.appLoadingCtrl.present();
  }

  async hideLoading(){
    this.appLoadingCtrl.dismiss();
  }
  async showToastMessge(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      color: 'primary',
      cssClass: 'toast-style',
      duration: 2000
    });
    toast.present();
  }

  async showIonicAlert(type, msg) {
    let headerTxt, msgTxt;
    if(type == 'success'){
      headerTxt = 'Done';
    }
    else if(type == 'error'){
      headerTxt = 'Failed';
    }
    const alert = await this.alertController.create({
      header: headerTxt,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
