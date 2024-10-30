import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private authService: AppService,
  ) { }

  logout() {
    localStorage.removeItem("token");
    this.authService.logout();
    this.router.navigate(["/login"]);
  }    
}
