import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  mainForm: FormGroup;

  dataList: Post;
  mode: string;
  isDisabled = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private postService: PostService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.mode = state.mode;
      this.dataList = state.data;
    }
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.mainForm = this.formBuilder.group({
      title: [{ value: '', disabled: false }, Validators.required],
      content: [{ value: '', disabled: false }, Validators.required],
    });

    if (this.mode) {
      Object.keys(this.mainForm.controls).forEach((key) => {
        this.mainForm.get(key).setValue(this.dataList[key]);
      });
      if (this.mode === 'view') {
        this.mainForm.disable();
        this.isDisabled = true;
      } else {
        this.mainForm.updateValueAndValidity();
      }
    }
  }

  onSubmit() {
    if (this.mainForm.invalid) {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: 'Error',
        message: 'Terjadi kesalahan, periksa kembali isian dan format form.',
        accept: () => {},
      });
    } else {
      if (this.dataList) {
        /** edit mode */
        this.doEdit();
      } else {
        /** create mode */
        this.doCreate();
      }
    }
  }

  onCancel() {
    this.router.navigate(['/post/list']);
  }

  onReset() {
    this.mainForm.reset();
  }

  doCreate() {
    const dataForm: Post = this.mainForm.value;
    this.postService.add(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil disimpan.',
            accept: () => {
              this.router.navigate(['/post/list']);
            },
          });
        }
      },
      (error) => {
        this.confirmationService.confirm({
          acceptIcon: null,
          rejectVisible: false,
          header: 'Error',
          message: 'Gagal menyimpan data.' + error,
          accept: () => {},
        });
      }
    );
  }

  doEdit() {
    const dataForm: Post = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.postService.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil diubah.',
            accept: () => {
              this.router.navigate(['/post/list']);
            },
          });
        }
      },
      (error) => {
        this.confirmationService.confirm({
          acceptIcon: null,
          rejectVisible: false,
          header: 'Error',
          message: 'Gagal mengubah data.' + error,
          accept: () => {},
        });
      }
    );
  }

}
