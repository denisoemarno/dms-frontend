import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Dropdown } from "src/app/core/models/dropdown";
import { ConfirmationService } from "primeng/api";
import { Users } from "src/app/auth/models/users";
import { UsersService } from "../../services/users.service";
import { UserRole } from "src/app/core/enums/role.enum";

@Component({
  selector: "app-users-detail",
  templateUrl: "./users-detail.component.html",
  styleUrls: ["./users-detail.component.scss"],
})
export class UsersDetailComponent implements OnInit {
  mainForm: FormGroup;
  gender: Dropdown[] = [
    { label: "", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  roles: Dropdown[] = [
    { label: "", value: "" },
    { label: "Admin", value: UserRole.ADMIN },
    { label: "Approval", value: UserRole.APPROVAL },
    { label: "Castadian", value: UserRole.CASTADIAN },
    { label: "Director", value: UserRole.DIRECTOR },
    { label: "Document Owner", value: UserRole.DOCUMENT_OWNER },
    { label: "Document Writer", value: UserRole.DOCUMENT_WRITER },
    { label: "User", value: UserRole.USER },
  ];
  dataList: Users;
  mode: string;
  isDisabled = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private userService: UsersService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.mode = state.mode;
      this.dataList = state.data;
    }
  }

  ngOnInit() {
    console.log(UserRole.ADMIN)
    this.initForm();
  }

  initForm() {
    this.mainForm = this.formBuilder.group({
      email: [
        { value: "", disabled: false },
        [Validators.required, Validators.email],
      ],
      password: [
        { value: "", disabled: false },
        [Validators.required, Validators.minLength(6)],
      ],
      firstName: [{ value: "", disabled: false }, Validators.required],
      lastName: [{ value: "", disabled: false }, Validators.required],
      birthday: [{ value: "", disabled: false }, Validators.required],
      gender: [{ value: "", disabled: false }, Validators.required],
      role: [{ value: "", disabled: false }, Validators.required],
    });

    if (this.mode) {
      Object.keys(this.mainForm.controls).forEach((key) => {
        this.mainForm.get(key).setValue(this.dataList[key]);
      });
      if (this.mode === "view") {
        this.mainForm.disable();
        this.isDisabled = true;
      } else {
        this.mainForm.get("email").clearValidators();
        this.mainForm.get("email").disable();
        this.mainForm.get("password").clearValidators();
        this.mainForm.get("password").disable();
        this.mainForm.updateValueAndValidity();
      }
    }
  }

  onSubmit() {
    if (this.mainForm.invalid) {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: "Error",
        message: "Terjadi kesalahan, periksa kembali isian dan format form.",
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
      header: "Confirmation",
      message: "Apakah anda ingin meninggalkan halaman ini ?",
      accept: () => {
        this.router.navigate(["/users/list"]);
      },
      reject: () => {},
    });
    */
    this.router.navigate(["/users/list"]);
  }
  onReset() {
    this.mainForm.reset();
  }

  doCreate() {
    const dataForm: Users = this.mainForm.value;
    this.userService.register(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: "Success",
            message: "Data berhasil disimpan.",
            accept: () => {
              this.router.navigate(["/users/list"]);
            },
          });
        }
      },
      (error) => {
        this.confirmationService.confirm({
          acceptIcon: null,
          rejectVisible: false,
          header: "Error",
          message: "Gagal menyimpan data." + error,
          accept: () => {},
        });
      }
    );
  }

  doEdit() {
    const dataForm: Users = this.mainForm.value;
    dataForm.id = this.dataList.id;
    this.userService.update(dataForm).subscribe(
      (res) => {
        if (res) {
          this.confirmationService.confirm({
            acceptIcon: null,
            rejectVisible: false,
            header: "Success",
            message: "Data berhasil diubah.",
            accept: () => {
              this.router.navigate(["/users/list"]);
            },
          });
        }
      },
      (error) => {
        this.confirmationService.confirm({
          acceptIcon: null,
          rejectVisible: false,
          header: "Error",
          message: "Gagal mengubah data." + error,
          accept: () => {},
        });
      }
    );
  }
}
