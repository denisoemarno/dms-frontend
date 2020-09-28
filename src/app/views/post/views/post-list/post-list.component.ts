import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  dataList: Post[] = [];
  dataSelected: Post;
  columns: any[];
  currentUrl: string;
  totalRowsCount: number;
  querySearch: string = '';
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.columns = [
      { field: 'id', header: 'Id' },
      { field: 'title', header: 'Title' },
      { field: 'content', header: 'Content' },
      { field: 'authorFirstName', header: 'Created By' },
    ];
    this.onPopulate();
  }

  onPopulate(offset: number = 1, limit: number = 10, q: string = this.querySearch) {
    this.postService.getPost(q, offset, limit).subscribe((res) => {
      this.dataList = res['rows'];
      this.totalRowsCount = res['totalCount'];
    });
  }

  onAdd() {
    this.router.navigate(['/post/add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onUpdate() {
    if (this.dataSelected) {
      this.router.navigate(['/post/edit'], {
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
      this.router.navigate(['/post/detil'], {
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
    this.postService.delete(this.dataSelected).subscribe(
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
