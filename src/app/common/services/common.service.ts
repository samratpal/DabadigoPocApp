import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Order } from './../../common/models/order.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  hasLoggedIn = new Subject<boolean>(); 

  generateChecksum(orderDetails){    
    // const url = 'https://samrat-nodejs-apis.herokuapp.com/generate_checksum';
    // const url = 'https://e0s5foto18.execute-api.ap-south-1.amazonaws.com/dev/dabadigo/core/createchecksum';
    const url = 'https://e0s5foto18.execute-api.ap-south-1.amazonaws.com/dev/dabadigo/core/paytm/createchecksum';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("requestBody: " + JSON.stringify(orderDetails));
    return this.http.post(url, orderDetails, httpOptions).pipe(tap(resData =>{
      console.log(resData);
    }) )
  }

}
