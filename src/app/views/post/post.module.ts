import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailComponent } from './views/post-detail/post-detail.component';
import { PostListComponent } from './views/post-list/post-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [PostDetailComponent, PostListComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
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
export class PostModule {}
