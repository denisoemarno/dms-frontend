import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { Tags } from '../../models/tags';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'src/app/core/models/column';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {

  dataList: Tags[] = [];
  dataSelected: Tags;
  columns: Column[];
  currentUrl: string;
  totalRowsCount: number;
  querySearch: string = '';

  constructor(
    private tagService: TagsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.columns = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'color', header: 'Color' },
      { field: 'authorFirstName', header: 'Created By' },
    ];
    this.onPopulate();
  }

  onPopulate(offset: number = 1, limit: number = 10, q: string = this.querySearch) {
    this.tagService.getTags(q, offset, limit).subscribe((res) => {
    this.dataList = res['rows'];
    this.totalRowsCount = res['totalCount'];
    //  this.dataList = [...res];
    });
  }

  onAdd() {
    this.router.navigate(['/tags/add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onUpdate() {
    if (this.dataSelected) {
      this.router.navigate(['/tags/edit'], {
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
      this.router.navigate(['/tags/detil'], {
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
    this.tagService.delete(this.dataSelected).subscribe(
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
