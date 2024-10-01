// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../shared/styles/common-styles.scss']
})
export class DashboardComponent {
  title = 'Dashboard';
}
