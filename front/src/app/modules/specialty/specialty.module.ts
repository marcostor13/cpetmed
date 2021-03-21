import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@shared/components/header/header.module';
import { MenuModule } from '@shared/components/menu/menu.module';
import { SpecialtyRoutingModule } from './specialty-routing.module';
import { SpecialtyComponent } from './specialty.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [SpecialtyComponent],
  imports: [  
    CommonModule,
    SpecialtyRoutingModule,
    HeaderModule,
    MenuModule,
    DialogModule,
    FormsModule,
    ConfirmPopupModule,
    ToastModule
  ],
 
})
export class SpecialtyModule { }
