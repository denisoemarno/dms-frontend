import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRoutingModule } from './document-type-routing.module';
import { DocumentTypeListComponent } from './views/document-type-list/document-type-list.component';
import { DocumentTypeDetailComponent } from './views/document-type-detail/document-type-detail.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [DocumentTypeListComponent, DocumentTypeDetailComponent],
  imports: [
    CommonModule,
    DocumentTypeRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    CalendarModule,
    ToastModule,
    MessagesModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class DocumentTypeModule { }
