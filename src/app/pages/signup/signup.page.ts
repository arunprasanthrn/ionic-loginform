import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,Validators,FormControl,FormGroup } from '@angular/forms';
import { AlertController,NavController,LoadingController } from '@ionic/angular';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validationMessages ={
    names: [{type:"required", message:"Please Enter your Full Names"}],
    phone: [{type:"required", message:"Please Enter your Phone No."}],
    email: [
      {type: 'required',message:"Enter your Email Adress"},
      {type:"pattern", meesage:"Please check  the Email Entered is Incorrect. Try again.."}
    ],
    password: [
      {type: "required", message: "password is required here"},
      {type:"minlength", message: "Passwrd must be at least 6 character"}
    ]
  }
ValidationFormUser : FormGroup;
loading:any;
  constructor( private router: Router, private preference: AppPreferences,
    private navCtr: NavController ,private formbuilder:FormBuilder,
    private authService: AuthService, public loadingCtrl : LoadingController, private alertCtrl: AlertController) 
  { }
  RedirectTologinscreen()
  {
    this.router.navigateByUrl('/loginscreen');
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
    
    this.ValidationFormUser = this.formbuilder.group({
      names: new FormControl('', Validators.compose([
         Validators.required
      ])),
  
      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
  
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
  
    })
  
    }
  
    registerUser(value){
     this.showalert();
      try{
     this.authService.userRegistration(value).then( response =>{
       console.log(response);
       if(response.user){
         response.user.updateProfile({
           displayName: value.names,
           email: value.email,
           phoneNumber: value.phone
           
         });
      this.preference.store(value.phone,'userPhoneNumber');
       this.loadingCtrl.dismiss();
       this.router.navigate(['loginscreen']);
       }
     }, error=>{
       this.loadingCtrl.dismiss();
       this.errorLoading(error.message);
  
     })
   }catch(erro){
     console.log(erro)
  }
    }
  
  
    async errorLoading(message: any){
      const loading = await this.alertCtrl.create({
        header:"Error Registering",
        message:message,
        buttons:[{
          text:'ok',
          handler: ()=>{
          this.navCtr.navigateBack(['signup'])
        }
        }]
      })
       await loading.present();
    }
  
  
  
  
    async showalert(){
   var load = await this.loadingCtrl.create({
     message:"please wait....",
  
   })
    load.present();
  }
  
  }

