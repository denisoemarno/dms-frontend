import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { ToastModule } from "primeng/toast";
import { MessagesModule } from "primeng/messages";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersListComponent } from "./views/users-list/users-list.component";
import { UsersDetailComponent } from "./views/users-detail/users-detail.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PaginatorModule } from "primeng/paginator";
import { UserProfileComponent } from './views/user-profile/user-profile.component';

@NgModule({
  declarations: [UsersListComponent, UsersDetailComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    CalendarModule,
    ToastModule,
    MessagesModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class UsersModule {}
