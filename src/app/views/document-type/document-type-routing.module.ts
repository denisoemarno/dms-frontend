import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentTypeListComponent } from './views/document-type-list/document-type-list.component';
import { DocumentTypeDetailComponent } from './views/document-type-detail/document-type-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: DocumentTypeListComponent,
      },
      {
        path: 'add',
        component: DocumentTypeDetailComponent,
      },
      {
        path: 'show',
        component: DocumentTypeDetailComponent,
      },
      {
        path: 'edit',
        component: DocumentTypeDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypeRoutingModule { }
