import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDVE4nxf0pwacCciVQY-kf6y_67HJbr_Dg",
      authDomain: "chatapp-920b4.firebaseapp.com",
      projectId: "chatapp-920b4",
      storageBucket: "chatapp-920b4.appspot.com",
      messagingSenderId: "862801798181",
      appId: "1:862801798181:web:bc1e790a49bef5365ecbcc"
    }),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
