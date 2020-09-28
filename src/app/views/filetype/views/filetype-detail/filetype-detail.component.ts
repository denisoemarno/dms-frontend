import { Component, OnInit } from '@angular/core';
import { Filetype } from '../../models/filetype';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FiletypeService } from '../../services/filetype.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-filetype-detail',
  templateUrl: './filetype-detail.component.html',
  styleUrls: ['./filetype-detail.component.scss']
})
export class FiletypeDetailComponent implements OnInit {
  mainForm: FormGroup;
  dataList: Filetype;
  mode: string;
  isDisabled = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private filetypeService: FiletypeService
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
      no_of_files: [{ value: '', disabled: false }, Validators.required],
      labels: [{ value: '', disabled: false }, Validators.required],
      file_validations: [{ value: '', disabled: false }, Validators.required],
      file_maxsize: [{ value: '', disabled: false }, Validators.required],
    });

    if (this.mode) {
      Object.keys(this.mainForm.controls).forEach((key) => {
        this.mainForm.get(key).setValue(this.dataList[key]);
      });
      if (this.mode === 'view') {
        this.mainForm.disable();
        this.isDisabled = true;
      }
    }
  }
  onSubmit() {
    if (this.mainForm.invalid) {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: 'Error',
        message: 'Terjadi kesalahan, periksa kembali isian dan format form dan email.',
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
    this.router.navigate(['/filetype/list']);
  }
  onReset() {
    this.mainForm.reset();
  }

  doCreate() {
    const dataForm: Filetype = this.mainForm.value;
    this.filetypeService.add(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil disimpan.',
            accept: () => {
              this.router.navigate(['/filetype/list']);
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
    const dataForm: Filetype = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.filetypeService.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil diubah.',
            accept: () => {
              this.router.navigate(['/filetype/list']);
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
