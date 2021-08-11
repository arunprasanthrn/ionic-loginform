import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router:Router) { }
  RedirectTologinscreen()
  {
    this.router.navigateByUrl('/loginscreen');
  }
  RedirectTosignup()
  {
    this.router.navigateByUrl('/signup');
  }

  ngOnInit() {
  }

}
