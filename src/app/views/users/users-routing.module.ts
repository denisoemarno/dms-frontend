import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './views/users-list/users-list.component';
import { UsersDetailComponent } from './views/users-detail/users-detail.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: UsersListComponent,
      },
      {
        path: 'add',
        component: UsersDetailComponent,
      },
      {
        path: 'show',
        component: UsersDetailComponent,
      },
      {
        path: 'edit',
        component: UsersDetailComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
