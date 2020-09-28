import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocumentEditorRoutingModule } from './document-editor-routing.module';
import { DocumentEditorComponent } from './document-editor.component';

import { DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  imports: [
    DocumentEditorRoutingModule,
    ChartsModule,
    BsDropdownModule,
    DocumentEditorContainerModule,
    FileUploadModule,
  ],
  declarations: [ DocumentEditorComponent ]
})
export class DocumentEditorModule { }
