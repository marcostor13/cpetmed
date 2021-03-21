import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@shared/components/header/header.module';
import { MenuModule } from '@shared/components/menu/menu.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ToastModule } from 'primeng/toast';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { ListboxModule } from 'primeng/listbox';


@NgModule({
  declarations: [CalendarComponent],
  imports: [  
    CommonModule,
    CalendarRoutingModule,
    HeaderModule,
    MenuModule,
    DialogModule,
    FormsModule,
    ConfirmPopupModule,
    ToastModule,
    NzCalendarModule,
    ListboxModule
  ],
 
})
export class CalendarModule { }
