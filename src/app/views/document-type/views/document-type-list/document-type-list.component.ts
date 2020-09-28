import { Component, OnInit } from '@angular/core';
import { DocumentTypes } from 'src/app/views/document-type/models/documenttype';
import { Column } from 'src/app/core/models/column';
import { DocumentTypeService } from '../../services/documenttype.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss']
})
export class DocumentTypeListComponent implements OnInit {

  dataList: DocumentType[] = [];
  dataSelected: DocumentTypes;
  columns: Column[];
  totalRowsCount: number;
  querySearch: string = '';
  constructor(
    private documentTypeService: DocumentTypeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Name' },
      { field: 'workflow_id', header: 'Work Flow ID' },
      { field: 'workflow_name', header: 'Work Flow Name' },
    ];
    this.onPopulate();
  }

  onPopulate(offset: number = 1, limit: number = 10, q: string = this.querySearch) {
    this.documentTypeService.getDocumentType(q, offset, limit).subscribe((res) => {
      this.dataList = res['rows'];
      this.totalRowsCount = res['totalCount'];
    });
  }
  onAdd() {
    this.router.navigate(['/document-type/add'], {
      relativeTo: this.activatedRoute,
    });
  }
  onUpdate() {
    if (this.dataSelected) {
      this.router.navigate(['/document-type/edit'], {
        relativeTo: this.activatedRoute,
        state: { data: this.dataSelected, mode: 'update' },
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
  onView() {
    if (this.dataSelected) {
      this.router.navigate(['/document-type/show'], {
        relativeTo: this.activatedRoute,
        state: { data: this.dataSelected, mode: 'view' },
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
  onDelete() {
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
    this.documentTypeService.delete(this.dataSelected).subscribe(
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
    console.log(this.dataSelected);
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
