import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentListComponent } from './views/document-list/document-list.component';
import { DocumentDetailComponent } from './views/document-detail/document-detail.component';
import { DocumentUploadComponent } from './views/document-upload/document-upload.component';
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
import { EditorModule } from 'primeng/editor';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocumentShowComponent } from './views/document-show/document-show.component';
import {TabViewModule} from 'primeng/tabview';
import { DocumentMeTaskComponent } from './views/document-me-task/document-me-task.component';
import { DocumentOwnerTaskComponent } from './views/document-owner-task/document-owner-task.component';
import { ActivityModule } from '../activity/activity.module';
import { FileUploadModule } from 'primeng/fileupload';
import {BlockUIModule} from 'primeng/blockui';
@NgModule({
  declarations: [
    DocumentListComponent,
    DocumentDetailComponent,
    DocumentUploadComponent,
    DocumentShowComponent,
    DocumentMeTaskComponent,
    DocumentOwnerTaskComponent,
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
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
    EditorModule,
    AutoCompleteModule,
    DataViewModule,
    CardModule,
    PanelModule,
    TooltipModule,
    BsDropdownModule,
    TabViewModule,
    ActivityModule,
    FileUploadModule,
    BlockUIModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class DocumentModule {}
