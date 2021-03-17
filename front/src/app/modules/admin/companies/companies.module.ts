import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeaderModule } from '@shared/components/header/header.module';
import { FormsModule } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    HeaderModule,
    FormsModule,
    OrderListModule,
  ]
})
export class CompaniesModule { }
