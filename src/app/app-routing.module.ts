import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamesComponent } from './exames/exames.component';
import { RootComponent } from './root/root.component';

const routes: Routes = [
  { path: '/', component: RootComponent },
  { path: 'exames', component: ExamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
