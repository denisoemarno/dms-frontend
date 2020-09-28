import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './views/activity/activity.component';


@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule
  ],
  exports : [
    ActivityComponent,
  ]
})
export class ActivityModule { }
