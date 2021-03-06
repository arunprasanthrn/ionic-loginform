import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

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
  constructor(public router:Router ,public formbuilder:FormBuilder,
    public authservice:AuthService, private firestore :AngularFirestore ,private nav:NavController) { }
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
  
    LoginUser(value){
      console.log("Am logged in");
      try{
         this.authservice.loginFireAuth(value).then( resp =>{
           console.log(resp);
           //this.router.navigateByUrl('/tabs');
           if(resp.user){
             this.authservice.setUser({
               username :resp.user.displayname,
               uid:resp.user.uid
             })
             const userProfile = this.firestore.collection('profile').doc(resp.user.uid);

       userProfile.get().subscribe( result=>{

        if(result.exists){
          this.nav.navigateForward(['tabs']);
        }else{

          this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
            name: resp.user.displayName,
            email: resp.user.email
          });

           this.nav.navigateForward(['uploadimage']);
        }
       })
     }
            
           
      })
    }catch(err){
        console.log(err);
      }
    }
}