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
  gettingChecksum = false;
  checksumGenerated = null;

  constructor(private router: Router,private commonService: CommonService, private platform: Platform) { }

  ngOnInit() {

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

    let oDetails = {
        'order_id': orderId,
        'customer_id' : 'CUST00012',
        'txn_amount': rechargeAmount,
        'email': 'test.email@test.com',
        'phone': '1234567890',
        'callback_url': 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp',
        // 'callback_url': 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' + orderId,
        'website': 'APPSTAGING',
        'industry_type_id': 'Retail',
        'channel_id': 'WAP'
    }
    this.gettingChecksum = true;
    this.commonService.generateChecksum(oDetails).subscribe((response) =>{
      this.gettingChecksum = false;
      console.log('checksum received: ', JSON.stringify(response));
      this.checksumGenerated  = response['CHECKSUMHASH'];
      this.startPayment(oDetails, response);      
    })
	  
  }

  startPayment(orderDetails, data){
    console.log('starting payment...');
    console.log('orderDetails received: ' + JSON.stringify(orderDetails));
    console.log('checksum received: ' + data.CHECKSUMHASH);
    let txnRequest = {
        'MID': 'AjvmhF55300080944054',
        'ORDER_ID': orderDetails.order_id,
        'CUST_ID': orderDetails.customer_id,
        'INDUSTRY_TYPE_ID': orderDetails.industry_type_id,
        'CHANNEL_ID': orderDetails.channel_id,
        'TXN_AMOUNT': orderDetails.txn_amount,
        'WEBSITE': orderDetails.website,
		    'CHECKSUMHASH': data.CHECKSUMHASH
    }
    // txnRequest['CALLBACK_URL'] = 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' + txnRequest.ORDER_ID;
    txnRequest['CALLBACK_URL'] = 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp';
    txnRequest['ENVIRONMENT'] = 'staging';

    const successCallback = (response) => {
		  console.log("Paytm Plugin startPayment Success Callback response:", response);
      if (response.STATUS == 'TXN_SUCCESS') {
      } else {
          alert(`Transaction Failed for reason: - ${response.RESPMSG} (${response.RESPCODE})`);
      }
    }

    const failureCallback = (error) => {
		  console.log("Paytm Plugin startPayment Error Callback response:", error);
      alert(`Transaction Failed for reason: - ${error.RESPMSG} (${error.RESPCODE})`);
    }

    console.log('final txnRequest: ', JSON.stringify(txnRequest));
    console.log("App running on: " + this.platform.platforms());
    if(this.platform.is('android')){
      (<any>window).paytm.startPayment(txnRequest, successCallback, failureCallback);
    }
  }

}
