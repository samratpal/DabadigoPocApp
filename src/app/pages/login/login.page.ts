import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './../../common/services/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit() {
  }

  navigateToHome(){
    this.commonService.hasLoggedIn.next(true);
    this.router.navigate(['/wallet']);
  }
  navigateToSignup(){
    this.router.navigate(['/signup']);
  }

}

