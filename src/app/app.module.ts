import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { RouterModule, Routes } from '@angular/router';
import { ExamesComponent } from './exames/exames.component';
import { ExamesModule } from './exames/exames.module';

const routes: Routes = [{ path: 'exames', component: ExamesComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    FormsModule,
    ExamesModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA_uQmCv0mt80ia7NAvo_59kaTuGkjtweU',
      authDomain: 'exametracker.firebaseapp.com',
      databaseURL: 'https://exametracker-default-rtdb.firebaseio.com/',
      projectId: 'exametracker',
      storageBucket: 'exametracker.appspot.com',
      messagingSenderId: '121806824401',
      appId: '1:121806824401:web:c520d1aa31cc87506df6f0',
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [RootComponent],
  exports: [RouterModule],
  bootstrap: [RootComponent],
  providers: [AuthService],
})
export class AppModule {}
