import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiletypeListComponent } from './views/filetype-list/filetype-list.component';
import { FiletypeDetailComponent } from './views/filetype-detail/filetype-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: FiletypeListComponent,
      },
      {
        path: 'add',
        component: FiletypeDetailComponent,
      },
      {
        path: 'show',
        component: FiletypeDetailComponent,
      },
      {
        path: 'edit',
        component: FiletypeDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiletypeRoutingModule { }
