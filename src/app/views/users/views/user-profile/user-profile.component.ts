import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRole } from 'src/app/core/enums/role.enum';
import { Users } from 'src/app/auth/models/users';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { UsersService } from '../../services/users.service';
import { Dropdown } from 'src/app/core/models/dropdown';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  mainForm: FormGroup;
  gender: Dropdown[] = [
    { label: "", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  dataList: Users;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private userService: UsersService
  ) {
    this.getProfile();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.mainForm = this.formBuilder.group({
      firstName: [{ value: "", disabled: false }, Validators.required],
      lastName: [{ value: "", disabled: false }, Validators.required],
      birthday: [{ value: "", disabled: false }, Validators.required],
      gender: [{ value: "", disabled: false }, Validators.required],
    });
  }

  getProfile() {
    this.userService.profile().subscribe(res => {
      this.dataList = res;
      this.mainForm.patchValue({
        email: this.dataList.email,
        password: this.dataList.password,
        firstName: this.dataList.firstName,
        lastName: this.dataList.lastName,
        birthday: this.dataList.birthday,
        gender: this.dataList.gender,
      });
    });
  }

  onSubmit() {
    if (this.mainForm.invalid) {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: "Error",
        message: "Terjadi kesalahan, periksa kembali isian dan format form.",
        accept: () => { },
      });
    } else {
      this.doEdit();
    }
  }

  doEdit() {
    const dataForm: Users = this.mainForm.value;
    
    this.userService.updateprofile(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: "Success",
            message: "Data berhasil diubah.",
            accept: () => { },
          });
        }
      },
      (error) => {
        this.confirmationService.confirm({
          acceptIcon: null,
          rejectVisible: false,
          header: "Error",
          message: "Gagal mengubah data." + error,
          accept: () => { },
        });
      }
    );
  }
}
