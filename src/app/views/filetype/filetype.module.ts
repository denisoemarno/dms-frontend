import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiletypeRoutingModule } from './filetype-routing.module';
import { FiletypeListComponent } from './views/filetype-list/filetype-list.component';
import { FiletypeDetailComponent } from './views/filetype-detail/filetype-detail.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [FiletypeDetailComponent, FiletypeListComponent],
  imports: [
    CommonModule,
    FiletypeRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    CalendarModule,
    ToastModule,
    MessagesModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class FiletypeModule { }
