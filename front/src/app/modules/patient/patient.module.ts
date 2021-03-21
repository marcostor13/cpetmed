import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@shared/components/header/header.module';
import { MenuModule } from '@shared/components/menu/menu.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [PatientComponent],
  imports: [  
    CommonModule,
    PatientRoutingModule,
    HeaderModule,
    MenuModule,
    DialogModule,
    FormsModule,
    ConfirmPopupModule,
    ToastModule
  ],
 
})
export class PatientModule { }
