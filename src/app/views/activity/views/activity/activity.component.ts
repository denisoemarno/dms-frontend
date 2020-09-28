import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  dataList: Document;
  activities: Activity[] = [];
  constructor(private activityService: ActivityService, private router: Router, private confirmationService : ConfirmationService) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.dataList = state.data;
    }
  }

  ngOnInit() {
    this.onPopulate();
  }

  onPopulate() {
    this.activityService.getbyid(this.dataList['id']).subscribe(res => {
      this.activities = [...res];
    }, error => {
      this.confirmationService.confirm({
        acceptIcon: null,
        rejectVisible: false,
        header: 'Error',
        message: 'Gagal mengambil data.' + error,
        accept: () => { },
      });
    });
  }

}
