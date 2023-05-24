import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB_FdSlaAiMNzB6ZrgpMLYm3u-NBZFPGRY',
      authDomain: 'angularlist-a6ac3.firebaseapp.com',
      databaseURL: 'https://angularlist-a6ac3.firebaseio.com',
      projectId: 'angularlist-a6ac3',
      storageBucket: 'angularlist-a6ac3.appspot.com',
      messagingSenderId: '75663811126',
      appId: '1:75663811126:web:86d08cee0c83ff918e2e97',
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [RootComponent],
  bootstrap: [RootComponent],
  providers: [AuthService]
})
export class AppModule {}
