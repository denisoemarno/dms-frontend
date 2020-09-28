import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsDetailComponent } from './views/tags-detail/tags-detail.component';
import { TagsListComponent } from './views/tags-list/tags-list.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  declarations: [TagsDetailComponent, TagsListComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    ColorPickerModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class TagsModule {}
