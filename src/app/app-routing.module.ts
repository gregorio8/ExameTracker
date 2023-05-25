import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamesComponent } from './exames/exames.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'exames', component: ExamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
