import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { MenuModule } from '@shared/components/menu/menu.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [UserComponent],
  imports: [
  
    CommonModule,
    UserRoutingModule,
    HeaderModule,
    MenuModule,
    DialogModule,
    FormsModule,
    ConfirmPopupModule,
    ToastModule
  ],
 
})
export class UserModule { }
