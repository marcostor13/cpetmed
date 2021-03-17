import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingsRoutingModule } from './landings-routing.module';
import { LandingsComponent } from './landings.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    LandingsComponent
  ],
  imports: [
    CommonModule,
    LandingsRoutingModule,
    CalendarModule,
    DialogModule,
  ]
})
export class LandingsModule { }
