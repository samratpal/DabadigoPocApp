import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Order } from './../../common/models/order.model';
import { tap, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  hasLoggedIn = new Subject<boolean>(); 

  generateChecksum(orderDetails): Observable<any>{    
    // const url = 'https://samrat-nodejs-apis.herokuapp.com/generate_checksum';
    // const url = 'https://e0s5foto18.execute-api.ap-south-1.amazonaws.com/dev/dabadigo/core/createchecksum';
    const url = 'https://e0s5foto18.execute-api.ap-south-1.amazonaws.com/dev/dabadigo/core/paytm/createchecksum';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log("requestBody: " + JSON.stringify(orderDetails));
    return this.http.post(url, orderDetails, httpOptions).pipe(
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

}
