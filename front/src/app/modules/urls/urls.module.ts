import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlsRoutingModule } from './urls-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    ListComponent, 
    AddComponent
  ],
  imports: [
    CommonModule,
    UrlsRoutingModule,
    HeaderModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    FormsModule,
    OrderListModule,
    TabViewModule,
    RadioButtonModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    ListboxModule,
    CalendarModule,
    MultiSelectModule,
  ]
})
export class UrlsModule { }
