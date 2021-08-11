import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {

  constructor(public router:Router) { }
  RedirectToForgotPassword()
  {
    this.router.navigateByUrl('/forgotpassword');
  }
  RedirectTosignup()
  {
    this.router.navigateByUrl('/signup');
  }
  RedirectTologin()
  {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
