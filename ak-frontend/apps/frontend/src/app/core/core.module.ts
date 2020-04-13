import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from '@akfe/core/constants/routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(ROUTES)]
})
export class CoreModule {}
