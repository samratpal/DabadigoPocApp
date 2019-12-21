import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from './../../common/services/common.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss']
})

export class WalletPage implements OnInit {
  orderId : string;
  public customerBalanace: string;

  txnRequest = {
    "MID": "AjvmhF55300080944054",
    "ORDER_ID": "ORDER0000000008",
    "CUST_ID": "",
    "INDUSTRY_TYPE_ID": "Retail",       // PayTM Credentials
    "CHANNEL_ID": "WAP",                // PayTM Credentials
    "TXN_AMOUNT": "",                  // Transaction Amount should be a String
    "WEBSITE": "APPSTAGING",            // PayTM Credentials
    "CALLBACK_URL": ""
  }

  constructor(private router: Router,private commonService: CommonService, private platform: Platform) { }

  ngOnInit() {
    this.customerBalanace = '0';
  }
  logOutUser(){
	  this.router.navigate(['/login']);
	  this.commonService.hasLoggedIn.next(false);
  }

  getChecksum(enteredAmount){
    
    const rechargeAmount = parseInt(enteredAmount).toFixed(2).toString();
    console.log('Amount: ' + rechargeAmount);
    const orderId = 'ORDER000' + (Math.round(Math.random() * 1000000)).toString(); 
    console.log('generated order Id:  ' + orderId);

    this.txnRequest.CUST_ID = "1",
    this.txnRequest.ORDER_ID = orderId,
    this.txnRequest.TXN_AMOUNT = rechargeAmount;
    this.txnRequest.CALLBACK_URL = ("https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + this.txnRequest.ORDER_ID);
    this.commonService.showLoading('Intiating transction');
    this.commonService.generateChecksum(this.txnRequest).subscribe((response) =>{
      this.commonService.hideLoading();
      console.log('generateChecksum response: ', JSON.stringify(response));      
      response["ENVIRONMENT"] = "staging";
      this.startPayment(response);
    },(error) => {
      this.commonService.hideLoading();
      this.commonService.showIonicAlert('error', error);
    })	  
  }

  startPayment(data){
    console.log('starting payment...');
    console.log('checksum received: ' + data.CHECKSUMHASH);

    const paymentSuccessCallback = (response) => {
		  console.log("Paytm Plugin startPayment Success Callback response:", response);
      if (response.STATUS == 'TXN_SUCCESS') {
        this.commonService.showLoading('Verifying transction');
        this.commonService.verifyChecksum(response).subscribe((data) =>{
          this.commonService.hideLoading();
          console.log('verifyChecksum response: ', JSON.stringify(data));
          if(data.txtStatus){
            this.commonService.showToastMessge('Recharge of ' + parseInt(response.TXNAMOUNT) + ' is successful');
            let totalBalance = parseInt(this.customerBalanace) + parseInt(response.TXNAMOUNT);
            this.customerBalanace = totalBalance.toString();
            document.getElementById("balance").innerHTML = totalBalance.toString();

          } else{
            this.commonService.showToastMessge("recharge failed");
          }
        },(error) => {
          this.commonService.hideLoading();
          console.log(`verifyChecksum http error: ${error}`);
          this.commonService.showIonicAlert('error', error);
        })
      } else {
          console.log(`Transaction Failed for reason: - ${response.RESPMSG} (${response.RESPCODE})`);
          this.commonService.showIonicAlert('error', response.RESPMSG);
      }
    }

    const paymentFailureCallback = (error) => {
		  console.log("Paytm Plugin startPayment Error Callback response:", error);
      this.commonService.showIonicAlert('error', error.RESPMSG); 
    }

    console.log('final txnRequest: ', JSON.stringify(data));
    console.log("App running on: " + this.platform.platforms());
    if(this.platform.is('android')){
      (<any>window).paytm.startPayment(data, paymentSuccessCallback, paymentFailureCallback);
    }
  }

}
