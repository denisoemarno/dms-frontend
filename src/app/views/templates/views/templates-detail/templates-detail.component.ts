import { Component, OnInit } from '@angular/core';
import { Templates } from '../../models/templates';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TemplatesService } from '../../services/templates.service';

@Component({
  selector: 'app-templates-detail',
  templateUrl: './templates-detail.component.html',
  styleUrls: ['./templates-detail.component.scss'],
})
export class TemplatesDetailComponent implements OnInit {
  mainForm: FormGroup;

  dataList: Templates;
  mode: string;
  isDisabled = false;

  fileToUpload: File = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private tempService: TemplatesService
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
      file: [{ value: '', disabled: false }, Validators.required],
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
        message:
          'Terjadi kesalahan, periksa kembali isian dan format form.',
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
    this.router.navigate(['/templates/list']);
  }

  onReset() {
    this.mainForm.reset();
  }

  doCreate() {
    const dataForm: Templates = this.mainForm.value;
    this.tempService.upload(dataForm, this.fileToUpload).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil disimpan.',
            accept: () => {
              this.router.navigate(['/templates/list']);
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
    const dataForm: Templates = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.tempService.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil diubah.',
            accept: () => {
              this.router.navigate(['/templates/list']);
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

  handleFileInput(files: FileList) {
    const allowedExt = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (files.length && allowedExt.includes(files.item(0).type)) {
      this.fileToUpload = files.item(0);
    } else {
      this.mainForm.get('file').setValue(null);
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: 'Error',
        message:
          'File format tidak sesuai. File di perbolehkan : pdf,doc,docx,xls,xlsx',
        accept: () => {},
      });
    }
  }
}
