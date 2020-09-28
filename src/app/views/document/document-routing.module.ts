import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListComponent } from './views/document-list/document-list.component';
import { DocumentDetailComponent } from './views/document-detail/document-detail.component';
import { DocumentUploadComponent } from './views/document-upload/document-upload.component';
import { DocumentShowComponent } from './views/document-show/document-show.component';
import { DocumentMeTaskComponent } from './views/document-me-task/document-me-task.component';
import { DocumentOwnerTaskComponent } from './views/document-owner-task/document-owner-task.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: DocumentListComponent,
      },
      {
        path: 'my-list',
        component: DocumentMeTaskComponent,
      },
      {
        path: 'owner-list',
        component: DocumentOwnerTaskComponent,
      },
      {
        path: 'add',
        component: DocumentDetailComponent,
      },
      {
        path: 'show',
        component: DocumentShowComponent,
      },
      {
        path: 'edit',
        component: DocumentDetailComponent,
      },
      {
        path: 'upload',
        component: DocumentUploadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
