import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './themes/error/404.component';
import { P500Component } from './themes/error/500.component';
import { LoginComponent } from './themes/login/login.component';
import { RegisterComponent } from './themes/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./themes/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./themes/base/base.module').then((m) => m.BaseModule),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./themes/buttons/buttons.module').then(
            (m) => m.ButtonsModule
          ),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./themes/chartjs/chartjs.module').then(
            (m) => m.ChartJSModule
          ),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./themes/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./themes/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./themes/theme/theme.module').then((m) => m.ThemeModule),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./themes/widgets/widgets.module').then(
            (m) => m.WidgetsModule
          ),
      },
      {
        path: 'doc-editor',
        loadChildren: () =>
          import('./themes/document-editor/document-editor.module').then(
            (m) => m.DocumentEditorModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('./views/tags/tags.module').then((m) => m.TagsModule),
      },
      {
        path: 'filetype',
        loadChildren: () =>
          import('./views/filetype/filetype.module').then((m) => m.FiletypeModule),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('./views/post/post.module').then((m) => m.PostModule),
      },
      {
        path: 'templates',
        loadChildren: () =>
          import('./views/templates/templates.module').then((m) => m.TemplatesModule),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./views/document/document.module').then((m) => m.DocumentModule),
      },
      {
        path: 'document-type',
        loadChildren: () =>
          import('./views/document-type/document-type.module').then((m) => m.DocumentTypeModule),
      },
    ],
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
