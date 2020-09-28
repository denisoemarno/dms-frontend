import { Component, OnInit } from "@angular/core";
import { Users } from "src/app/auth/models/users";
import { UsersService } from "../../services/users.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Column } from "src/app/core/models/column";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
  dataList: Users[] = [];
  dataSelected: Users;
  columns: Column[];
  totalRowsCount: number;
  querySearch: string = "";
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.columns = [
      { field: "email", header: "Email" },
      { field: "firstName", header: "Firstname" },
      { field: "lastName", header: "Lastname" },
      { field: "gender", header: "Gender" },
      { field: "role", header: "Role" },
    ];
    this.onPopulate();
  }

  onPopulate(
    offset: number = 1,
    limit: number = 10,
    q: string = this.querySearch
  ) {
    this.userService.getUsers(q, offset, limit).subscribe((res) => {
      this.dataList = res["rows"];
      this.totalRowsCount = res["totalCount"];
    });
  }
  onAdd() {
    this.router.navigate(["/users/add"], {
      relativeTo: this.activatedRoute,
    });
  }
  onUpdate() {
    if (this.dataSelected) {
      this.router.navigate(["/users/edit"], {
        relativeTo: this.activatedRoute,
        state: { data: this.dataSelected, mode: "update" },
      });
    } else {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: "Error",
        message: "Silahkan memilih data terlebih dahulu",
        accept: () => {},
      });
    }
  }
  onView() {
    if (this.dataSelected) {
      this.router.navigate(["/users/show"], {
        relativeTo: this.activatedRoute,
        state: { data: this.dataSelected, mode: "view" },
      });
    } else {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: "Error",
        message: "Silahkan memilih data terlebih dahulu",
        accept: () => {},
      });
    }
  }
  onDelete() {
    if (this.dataSelected) {
      this.confirmationService.confirm({
        message: "Apakah anda ingin menghapus data ini ?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.doDelete();
        },
        reject: () => {},
      });
    } else {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: "Error",
        message: "Silahkan memilih data terlebih dahulu",
        accept: () => {},
      });
    }
  }
  doDelete() {
    this.userService.delete(this.dataSelected).subscribe(
      (res) => {
        if (res) {
          this.messageService.add({
            severity: "success",
            summary: "Success Message",
            detail: "Berhasil menghapus data.",
          });
          this.onPopulate();
        }
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error Message",
          detail: "Gagal menghapus data." + error,
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
