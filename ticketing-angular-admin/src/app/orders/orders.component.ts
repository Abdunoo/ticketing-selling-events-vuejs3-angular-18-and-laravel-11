// src/app/orders/orders.component.ts
import { Component, inject } from '@angular/core';
import { ColumnType, PanemuTableController, PanemuTableDataSource, PanemuTableService } from 'ngx-panemu-table';
import { AppService, Order } from '../app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../shared/styles/common-styles.scss']
})
export class OrdersComponent {
  title = 'Orders';
  pts = inject(PanemuTableService);
  columns = this.pts.buildColumns<Order>([
    { field: 'id',type: ColumnType.INT },
    { field: 'order_no',type: ColumnType.INT },
    { field: 'user',
      type: ColumnType.STRING,
      formatter: (row)=>row.name,
    },
    { field: 'events',
      type: ColumnType.INT,
      formatter: (row)=>row.name,
    },
    { field: 'ticket_type',type: ColumnType.INT },
    { field: 'total_price',type: ColumnType.INT },
    { field: 'payment_status',type: ColumnType.INT },
    { field: 'created_at', 
      type: ColumnType.DATETIME,
      formatter: (row)=>this.convertToIndonesianDate(row)
    },
  ]);

  datasource = new PanemuTableDataSource<Order>();
  controller = PanemuTableController.create<Order>(this.columns, this.datasource, {
    rowOptions: { rowStyle: () => 'height: auto; max-height: 64px;' }, // Allow dynamic row height
  });

  constructor(private dataService: AppService) {}

  ngOnInit() {
    // Retrieve events from server via the DataService
    this.dataService.getListOrders().subscribe((result: Order[]) => {
      // Set the data to the data source
      this.controller.maxRows = 20;
      this.datasource.setData(result);

      // Render the data in table by calling reloadData
      this.controller.reloadData();
    });
  }

  convertToIndonesianDate(dateString: string): string {
    const date = new Date(dateString);
    console.log('date ', dateString);
  
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  
    const dayName = days[date.getDay()]; // Day of the week
    const day = date.getDate(); // Day of the month
    const monthName = months[date.getMonth()]; // Month name
    const year = date.getFullYear(); // Year
    const hours = date.getHours(); // Hours
    const minutes = date.getMinutes(); // Minutes
  
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const formattedDate = `${dayName}, ${day} ${monthName} ${year} ${formattedHours}.${formattedMinutes} WIB`;
  
    return formattedDate;
  }
}
