import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/views/document/models/document';
import { Column } from 'src/app/core/models/column';
import { DocumentService } from 'src/app/views/document/services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-document-owner-task',
  templateUrl: './document-owner-task.component.html',
  styleUrls: ['./document-owner-task.component.scss']
})
export class DocumentOwnerTaskComponent implements OnInit {

  
  dataList: Document[] = [];
  dataSelected: Document;
  columns: Column[];
  totalRowsCount: number;
  querySearch: string = '';

  constructor(
    private Documentervice: DocumentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Name' },
      { field: 'status', header: 'Status' },
      { field: 'tagsLabel', header: 'Tags' },
      { field: 'verifiedAt', header: 'Pembuatan' },
    ];
    this.onPopulate();
  }

  onPopulate(
    offset: number = 1,
    limit: number = 10,
    q: string = this.querySearch
  ) {
    this.Documentervice.getownertask(q, offset, limit).subscribe((res) => {
      this.dataList = res['rows'];
      this.totalRowsCount = res['totalCount'];

      this.dataList.map( key => {
        key.tags.map(tag => {
          key.tagsLabel = tag['name'] + tag['color'];
        });
      });
    });
  }
  onAdd() {
    this.router.navigate(['/documents/add'], {
      relativeTo: this.activatedRoute,
      state: { source : 'owner-list'},
    });
  }
  onUpdate(e) {
    this.dataSelected = e ;
    if (this.dataSelected) {
      this.router.navigate(['/documents/edit'], {
        relativeTo: this.activatedRoute,
        state: { data: this.dataSelected, mode: 'update', source : 'owner-list' },
      });
    } else {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: 'Error',
        message: 'Silahkan memilih data terlebih dahulu',
        accept: () => {},
      });
    }
  }
  onView(e) {
    this.dataSelected = e ;
    if (this.dataSelected) {
      this.router.navigate(['/documents/show'], {
        relativeTo: this.activatedRoute,
        state: { data: this.dataSelected, mode: 'view' , source : 'owner-list' },
      });
    } else {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: 'Error',
        message: 'Silahkan memilih data terlebih dahulu',
        accept: () => {},
      });
    }
  }
  onDelete(e) {
    this.dataSelected = e ;
    if (this.dataSelected) {
      this.confirmationService.confirm({
        message: 'Apakah anda ingin menghapus data ini ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.doDelete();
        },
        reject: () => {},
      });
    } else {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: 'Error',
        message: 'Silahkan memilih data terlebih dahulu',
        accept: () => {},
      });
    }
  }
  doDelete() {
    this.Documentervice.delete(this.dataSelected).subscribe(
      (res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Berhasil menghapus data.',
          });
          this.onPopulate();
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Gagal menghapus data.' + error,
        });
      }
    );
  }
  onRowSelect(e) {
    this.dataSelected = e.data;
  }
  onRowUnselect(e) {
    this.dataSelected = null;
  }
  onLazyLoad(e) {
    this.onPopulate(Math.floor(e.first / e.rows) + 1, e.rows);
  }
  onSearchChange(e) {
    this.querySearch = e.target.value;
    this.onPopulate();
  }

}
