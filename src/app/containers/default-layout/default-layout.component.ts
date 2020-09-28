import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/views/users/services/users.service';
import { Users } from 'src/app/auth/models/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  profile:Users;

  constructor(private authService: AuthService, private router: Router, private userService: UsersService) {
    this.getProfile();
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  onLogout() {
    this.authService.logout();

    this.router.navigate(['/auth/login']);
  }

  onShowProfile() {
    this.router.navigate(['/users/profile']);
  }

  getProfile() {
    this.userService.profile().subscribe(res => {
      this.profile = res;
      console.log(this.profile);
    });
  }
}
