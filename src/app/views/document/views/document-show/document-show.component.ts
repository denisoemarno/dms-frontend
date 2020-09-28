import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tags } from 'src/app/views/tags/models/tags';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DocumentService } from '../../services/document.service';
import { TagsService } from 'src/app/views/tags/services/tags.service';
import { Document } from '../../models/document';
import { WorkFlow } from '../../models/workflow';
import { Column } from 'src/app/core/models/column';
import { Dropdown } from 'src/app/core/models/dropdown';
import { File } from '../../models/file';

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.scss'],
})
export class DocumentShowComponent implements OnInit {
  mainForm: FormGroup;
  custodianForm: FormGroup;
  docWriterForm: FormGroup;
  dataList: Document;
  mode: string;
  source: string;
  isDisabled = false;
  tagsResults: Tags[];
  workflow: WorkFlow[] = [];
  fileToUpload: any[] = [];
  status: string;
  blocked = false;

  categories: Dropdown[] = [
    { label: 'Purchase Order', value: 'Purchase Order' },
    { label: 'Scheduling Agreement', value: 'Scheduling Agreement' },
    { label: 'Contract', value: 'Contract' },
  ];

  restrictions: Dropdown[] = [
    { label: 'Confidential', value: 'Confidential' },
    { label: 'Restricted', value: 'Restricted' },
    { label: 'Internal', value: 'Internal' },
    { label: 'Public', value: 'Public' },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private documentservice: DocumentService,
    private tagsService: TagsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      console.log(state);
      this.mode = state.mode;
      this.dataList = state.data;
      this.source = state.source;
      this.status = this.dataList.status;
    }
  }

  ngOnInit() {
    // this.getdocument();
    console.log(this.dataList);
    this.dataList;
    this.initForm();
    this.getParamWorkFlow();
  }

  initForm() {
    this.mainForm = this.formBuilder.group({
      comment: [{ value: '', disabled: false }],
      type: [{ value: 1, disabled: false }, Validators.required],
      parameter: [{ value: 'created', disabled: false }],
    });

    this.custodianForm = this.formBuilder.group({
      comment: [{ value: '', disabled: false }],
      documentNumber: [{ value: '', disabled: false }, Validators.required],
      category: [{ value: '', disabled: false }, Validators.required],
      restriction: [{ value: '', disabled: false }, Validators.required],
      parameter: [{ value: 'created', disabled: false }],
    });

    this.docWriterForm = this.formBuilder.group({
      tags: [{ value: '', disabled: false }, Validators.required],
      parameter: [{ value: 'draft', disabled: false }],
    });
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
    // this.router.navigate(['/documents/list']);
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

  onActionFlow(e: WorkFlow) {
    switch (this.status) {
      case 'writeDocument':
        this.approveDocWriter(e);
        break;
      case 'approvalCustodian':
        this.approveCustodian(e);
        break;
      default:
        this.approveCommon(e);
        break;
    }
  }

  doCreate() {
    const dataForm: Document = this.mainForm.value;
    this.documentservice.add(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil disimpan.',
            accept: () => {
              // this.router.navigate(['/documents/list']);
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

  onUpload(event) {
    console.log(event);
  }

  onRemove(event) {
    this.fileToUpload = this.fileToUpload.filter(
      (f) => f.name !== event.file.name
    );
  }

  onSelect(event) {
    this.fileToUpload = event.currentFiles;
  }

  doEdit() {
    const dataForm: Document = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.documentservice.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message: 'Data berhasil diubah.',
            accept: () => {
              // this.router.navigate(['/documents/list']);
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

  onViewDocument(data: File) {
    // this.router.navigate(['/doc-editor'], {
    //   state: { data: this.dataList , file : data },
    // });
  }

  getParamWorkFlow() {
    const flow = this.dataList.status.toLowerCase();
    this.documentservice.getworkflow(flow).subscribe((res) => {
      this.workflow = [...res];
      this.workflow.map( m => {
        m.label = m.parameter.charAt(0).toUpperCase() + m.parameter.slice(1);
        m.style = (m.parameter !== 'reject' ? 'btn btn-primary mr-1' : 'btn btn-danger');
      });
    });
  }

  getdocument() {
    this.documentservice.getbyid(this.dataList['id']).subscribe((res) => {
      console.log(res);
    });
  }

  handleFileInput(event) {
    // const allowedExt = [
    //   'application/pdf',
    //   'application/vnd.ms-excel',
    //   'application/msword',
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // ];
    // if (files.length && allowedExt.includes(files.item(0).type)) {
    //   this.fileToUpload = files.item(0);
    // } else {
    //   this.docWriterForm.get('uploadFile').setValue(null);
    //   this.confirmationService.confirm({
    //     acceptIcon: null,
    //     rejectVisible: false,
    //     header: 'Error',
    //     message:
    //       'File format tidak sesuai. File di perbolehkan : pdf,doc,docx,xls,xlsx',
    //     accept: () => {},
    //   });
    // }
  }

  approveCustodian(e: WorkFlow) {
    const dataform = this.custodianForm.value;
    dataform.parameter = e.parameter;
    console.log(dataform);
    this.blocked = true;
    this.documentservice.approvebyid(this.dataList.id, dataform).subscribe(
      (res) => {
        this.confirmationService.confirm({
          acceptIcon: null,
          rejectVisible: false,
          header: 'Success',
          message:
            'Data berhasil disimpan. Silahkan melanjutkan ke flow berikutnya',
          accept: () => {
            // this.router.navigate(['/documents/list']);
            this.router.navigate(['/documents/' + this.source]);
          },
        });
        this.blocked = false;
      },
      (error) => {
        this.confirmationService.confirm({
          acceptIcon: null,
          rejectVisible: false,
          header: 'Error',
          message: 'Gagal menyimpan data.' + error,
          accept: () => {},
        });
        this.blocked = false;
      }
    );
  }

  approveDocWriter(e: WorkFlow) {
    let tag = ' ';
    const tags = this.docWriterForm.get('tags').value;
    const dataform = this.docWriterForm.value;

    if (tags) {
      tags.forEach((t) => {
        tag += t.name + ',';
      });
    }
    dataform.parameter = e.parameter;
    dataform.tags = tag.substring(0, tag.length - 1);

    this.blocked = true;
    this.documentservice
      .approvebyidupload(this.dataList.id, dataform, this.fileToUpload)
      .subscribe(
        (res) => {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message:
              'Data berhasil disimpan. Silahkan melanjutkan ke flow berikutnya',
            accept: () => {
              // this.router.navigate(['/documents/list']);
              this.router.navigate(['/documents/' + this.source]);
            },
          });
          this.blocked = false;
        },
        (error) => {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Error',
            message: 'Gagal menyimpan data.' + error,
            accept: () => {},
          });
          this.blocked = false;
        }
      );
  }

  approveCommon(e: WorkFlow) {
    const comment = this.mainForm.get('comment').value;
    this.blocked = true;
    this.documentservice
      .approvebyid(this.dataList.id, { parameter: e.parameter, comment })
      .subscribe(
        (res) => {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Success',
            message:
              'Data berhasil disimpan. Silahkan melanjutkan ke flow berikutnya',
            accept: () => {
              // this.router.navigate(['/documents/list']);
              this.router.navigate(['/documents/' + this.source]);
            },
          });
          this.blocked = false;
        },
        (error) => {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: 'Error',
            message: 'Gagal menyimpan data.' + error,
            accept: () => {},
          });
          this.blocked = false;
        }
      );
  }
}
