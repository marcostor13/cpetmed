import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@shared/components/header/header.module';
import { MenuModule } from '@shared/components/menu/menu.module';
import { ProcedureRoutingModule } from './procedure-routing.module';
import { ProcedureComponent } from './procedure.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ProcedureComponent],
  imports: [  
    CommonModule,
    ProcedureRoutingModule,
    HeaderModule,
    MenuModule,
    DialogModule,
    FormsModule,
    ConfirmPopupModule,
    ToastModule
  ],
 
})
export class ProcedureModule { }
