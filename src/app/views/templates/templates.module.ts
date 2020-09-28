import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesListComponent } from './views/templates-list/templates-list.component';
import { TemplatesDetailComponent } from './views/templates-detail/templates-detail.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [TemplatesListComponent, TemplatesDetailComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class TemplatesModule { }
