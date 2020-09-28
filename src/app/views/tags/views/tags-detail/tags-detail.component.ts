import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tags } from '../../models/tags';
import { TagsService } from '../../services/tags.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags-detail',
  templateUrl: './tags-detail.component.html',
  styleUrls: ['./tags-detail.component.scss']
})
export class TagsDetailComponent implements OnInit {

  mainForm: FormGroup;

  dataList: Tags;
  mode: string;
  isDisabled = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private tagsService: TagsService
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
      name: [{ value: '', disabled: false }, Validators.required],
      color: [{ value: '', disabled: false }, Validators.required],
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
    this.router.navigate(['/tags/list']);
  }

  onReset() {
    this.mainForm.reset();
  }

  doCreate() {
    const dataForm: Tags = this.mainForm.value;
    this.tagsService.add(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil disimpan.',
            accept: () => {
              this.router.navigate(['/tags/list']);
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
    const dataForm: Tags = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.tagsService.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil diubah.',
            accept: () => {
              this.router.navigate(['/tags/list']);
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
