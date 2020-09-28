import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentEditorComponent } from './document-editor.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentEditorComponent,
    data: {
      title: 'Document Editor'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentEditorRoutingModule {}
