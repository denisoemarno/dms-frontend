import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DocumentTypeService } from '../../services/documenttype.service';
import { DocumentTypes } from 'src/app/views/document-type/models/documenttype';

@Component({
  selector: 'app-document-type-detail',
  templateUrl: './document-type-detail.component.html',
  styleUrls: ['./document-type-detail.component.scss']
})
export class DocumentTypeDetailComponent implements OnInit {

  mainForm: FormGroup;
  dataList: DocumentTypes;
  mode: string;
  isDisabled = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private documentTypeService: DocumentTypeService
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
      workflow_id: [{ value: '', disabled: false }, Validators.required],
      name: [{ value: '', disabled: false }, Validators.required],
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
        message: 'Terjadi kesalahan, periksa kembali isian dan format form.',
        accept: () => {},
      });
    } else {
      if(this.dataList) {
        /** edit mode */ 
        this.doEdit();
      } else {
        /** create mode */
        this.doCreate();
      }
    }
  }
  onCancel() {
    /*
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Apakah anda ingin meninggalkan halaman ini ?',
      accept: () => {
        this.router.navigate(['/documenttype/list']);
      },
      reject: () => {},
    });
    */
    this.router.navigate(['/document-type/list']);
  }
  onReset() {
    this.mainForm.reset();
  }

  doCreate() {
    const dataForm: DocumentTypes = this.mainForm.value;
    this.documentTypeService.add(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil disimpan.',
            accept: () => {},
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
    const dataForm: DocumentTypes = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.documentTypeService.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil diubah.',
            accept: () => {},
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
