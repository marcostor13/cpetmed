import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasspageRoutingModule } from './passpage-routing.module';
import { PasspageComponent } from './passpage.component';


@NgModule({
  declarations: [PasspageComponent],
  imports: [
    CommonModule,
    PasspageRoutingModule
  ]
})
export class PasspageModule { }
