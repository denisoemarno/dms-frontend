import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './views/post-list/post-list.component';
import { PostDetailComponent } from './views/post-detail/post-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PostListComponent,
      },
      {
        path: 'detil',
        component: PostDetailComponent,
      },
      {
        path: 'add',
        component: PostDetailComponent,
      },
      {
        path: 'edit',
        component: PostDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
