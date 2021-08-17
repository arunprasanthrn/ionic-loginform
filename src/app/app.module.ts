import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{ ReactiveFormsModule,FormsModule} from '@angular/forms';
import{AngularFireAuthModule} from '@angular/fire/auth';
import{AngularFirestoreModule} from '@angular/fire/firestore';
import{AngularFireModule} from '@angular/fire';
import{firebaseConfig} from 'src/environments/environment';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,ReactiveFormsModule,FormsModule ,AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
