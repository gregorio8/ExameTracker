import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExamesComponent } from './exames.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: 'exames', component: ExamesComponent }]),
  ],
  declarations: [ExamesComponent],
})
export class ExamesModule {}
