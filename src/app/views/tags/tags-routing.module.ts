import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsListComponent } from './views/tags-list/tags-list.component';
import { TagsDetailComponent } from './views/tags-detail/tags-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: TagsListComponent,
      },
      {
        path: 'detil',
        component: TagsDetailComponent,
      },
      {
        path: 'add',
        component: TagsDetailComponent,
      },
      {
        path: 'edit',
        component: TagsDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
