import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  ToolbarService,
  DocumentEditorContainer,
  DocumentEditorContainerComponent,
} from '@syncfusion/ej2-angular-documenteditor';
import { DocumentService } from 'src/app/views/document/services/document.service';
import { sampleDoc } from './sample';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  providers: [ToolbarService],
})
export class DocumentEditorComponent {
  @ViewChild('documenteditor_default', { static: true })
  public container: DocumentEditorContainer;

  file: any[] = [];
  constructor(private documentService: DocumentService) {}

  onCreate(): void {
    /*
    this.documentService.getdocumentview('Name-16b4.doc').subscribe(res => {
      console.log(res);
      if (this.container.documentEditor.isDocumentLoaded) {
        this.container.documentEditor.open(JSON.stringify(res));
      }
    },
    err => {
      // console.log(err);
      // if (this.container.documentEditor.isDocumentLoaded) {
      //   this.container.documentEditor.open(JSON.stringify(sampleDoc));
      // }
    });
    */
   this.documentService.getdocumentview('Name-16b4.doc').subscribe(x => {
    console.log(x);
   }, err => {
      console.log(err);
    });
  }

  onSelect(event) {
    this.documentService.getdocumentviewjava(event.currentFiles).subscribe( res => {
      if (this.container.documentEditor.isDocumentLoaded) {
        this.container.documentEditor.open(JSON.stringify(res));
      }
    },err => {
      console.log(err);
    });
  }
}
