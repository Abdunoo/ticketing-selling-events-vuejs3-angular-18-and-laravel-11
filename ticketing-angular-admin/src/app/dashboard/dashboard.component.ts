import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ChartData,
  ChartOptions,
  ChartType,
  registerables,
} from 'chart.js';
import { AppService } from '../app.service';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../shared/styles/common-styles.scss',
  ],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public chartType: ChartType = 'line';
  public months: string[] = [];

  // Separate datasets for each chart
  public eventsData: ChartData<'line'> = {
    labels: [],
    datasets: [{ label: 'Events', data: [], borderColor: '#4e73df' }],
  };
  public ordersData: ChartData<'line'> = {
    labels: [],
    datasets: [{ label: 'Orders', data: [], borderColor: '#1cc88a' }],
  };
  public usersData: ChartData<'line'> = {
    labels: [],
    datasets: [{ label: 'Users', data: [], borderColor: '#36b9cc' }],
  };

  constructor(private dataService: AppService) {}

  ngOnInit(): void {
    this.dataService.getMonthlyCounts().subscribe((data) => {
      this.months = data.map((item: any) => item.month);
      this.eventChart(data);
      this.orderChart(data);
      this.userChart(data);
      this.chart?.update();
    });
  }

  eventChart(data: []) {
    this.eventsData.labels = this.months;
    this.eventsData.datasets[0].data = data.map((item: any) => item.events);
  }

  orderChart(data: []) {
    this.ordersData.labels = this.months;
    this.ordersData.datasets[0].data = data.map((item: any) => item.orders);
  }

  userChart(data: []) {
    this.usersData.labels = this.months;
    this.usersData.datasets[0].data = data.map((item: any) => item.users);
  }
}
