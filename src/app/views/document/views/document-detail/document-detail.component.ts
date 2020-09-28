import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Document } from 'src/app/views/document/models/document';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DocumentService } from 'src/app/views/document/services/document.service';
import { Tags } from 'src/app/views/tags/models/tags';
import { TagsService } from 'src/app/views/tags/services/tags.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit {
  mainForm: FormGroup;
  dataList: Document;
  mode: string;
  source: string;
  isDisabled = false;
  tagsResults: Tags[];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private Documentervice: DocumentService,
    private tagsService: TagsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      console.log(state);
      this.mode = state.mode;
      this.dataList = state.data;
      this.source = state.source;
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.mainForm = this.formBuilder.group({
      name: [{ value: '', disabled: false }, Validators.required],
      description: [{ value: '', disabled: false }, Validators.required],
      title: [{ value: '', disabled: false }, Validators.required],
      type: [{ value: 1, disabled: false }, Validators.required],
      parameter: [{ value: 'withApproval', disabled: false }],
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
    console.log(this.mainForm);
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
    /*
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Apakah anda ingin meninggalkan halaman ini ?',
      accept: () => {
        this.router.navigate(['/document/list']);
      },
      reject: () => {},
    });
    */
    this.router.navigate(['/documents/' + this.source]);
  }
  onReset() {
    this.mainForm.reset();
  }
  onSearchTags(e) {
    this.tagsService.getTags(e.query).subscribe((res) => {
      console.log(res);
      this.tagsResults = res['rows'];
    });
  }

  doCreate() {
    const dataForm: Document = this.mainForm.value;
    // delete dataForm['tags']
    this.Documentervice.add(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil disimpan.',
            accept: () => {
              this.router.navigate(['/documents/' + this.source]);
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
    const dataForm: Document = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.Documentervice.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil diubah.',
            accept: () => {
              this.router.navigate(['/documents/' + this.source]);
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
