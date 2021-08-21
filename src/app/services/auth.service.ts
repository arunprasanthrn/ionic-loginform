import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

export interface UserPro{
  username:string;
  uid:string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
   private user:UserPro;

  constructor( public auth :AngularFireAuth) { }

  loginFireAuth(value){
    return new Promise<any> ((resolve,reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email,value.password).then(
        res=>resolve(res),
        error=>reject(error)
      )
    })
  }

  setUser(user:UserPro){
    return this.user=user;
  }
  getUID():string{
    return this.user.uid;
  }
  userRegistration(value){
    return new Promise<any> ((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(value.email,value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }
}
