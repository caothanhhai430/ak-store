import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLayoutComponent } from './components/nav-layout/nav-layout.component';
import {
  NzIconModule,
  NzLayoutModule,
  NzMenuModule,
  NzSelectModule
} from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavLayoutComponent],
  exports: [NavLayoutComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
    NzSelectModule,
    FormsModule
  ]
})
export class LayoutModule {}
