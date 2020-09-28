import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesListComponent } from './views/templates-list/templates-list.component';
import { TemplatesDetailComponent } from './views/templates-detail/templates-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: TemplatesListComponent,
      },
      {
        path: 'detil',
        component: TemplatesDetailComponent,
      },
      {
        path: 'add',
        component: TemplatesDetailComponent,
      },
      {
        path: 'edit',
        component: TemplatesDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
