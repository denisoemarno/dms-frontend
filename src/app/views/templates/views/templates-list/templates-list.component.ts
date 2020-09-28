import { Component, OnInit } from '@angular/core';
import { Templates } from '../../models/templates';
import { Column } from 'src/app/core/models/column';
import { TemplatesService } from '../../services/templates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  dataList: Templates[] = [];
  dataSelected: Templates;
  columns: Column[];
  currentUrl: string;
  totalRowsCount: number;
  querySearch = '';

  constructor(
    private tempService: TemplatesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.columns = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'template', header: 'Template' },
      { field: 'userFirstName', header: 'Created By' },
    ];
    this.onPopulate();
  }

  onPopulate(offset: number = 1, limit: number = 10, q: string = this.querySearch) {
    this.tempService.getTemplates(q, offset, limit).subscribe((res) => {
    this.dataList = res['rows'];
    this.totalRowsCount = res['totalCount'];
    //  this.dataList = [...res];
    });
  }

  onAdd() {
    this.router.navigate(['/templates/add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onUpdate() {
    if (this.dataSelected) {
      this.router.navigate(['/templates/edit'], {
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
      this.router.navigate(['/templates/detil'], {
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
    this.tempService.delete(this.dataSelected).subscribe(
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
