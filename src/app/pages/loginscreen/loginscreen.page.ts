import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  validationUserMessage={
    email:[
      {type:"required",message:"please enter your email"},
      {type:"pattern",message:"The entered email is incorrect.Try again."}
    ],
    password:[
      {type:"required",message:"please enter your password"},
      {type:"pattern",message:"password must be atleast 5 characters"}    ]
  }

  validationFormUser:FormGroup;
  constructor(public router:Router ,public formbuilder:FormBuilder) { }
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
    this.validationFormUser=this.formbuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ]))
      })
    

    }
  


}

