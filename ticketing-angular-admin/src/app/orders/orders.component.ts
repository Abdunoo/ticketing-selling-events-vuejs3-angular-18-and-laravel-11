import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { ColumnType, DefaultCellRenderer, PanemuTableController, PanemuTableDataSource, PanemuTableService } from 'ngx-panemu-table';
import { AppService, Events, Order } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../shared/styles/common-styles.scss']
})
export class OrdersComponent {
  title = 'Orders';
  pts = inject(PanemuTableService);
  actionCellTemplate = viewChild<TemplateRef<any>>('actionCellTemplate');
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
    {
      type: ColumnType.COMPUTED,
      formatter: (val: Events) => val.image_banner,
      cellRenderer: DefaultCellRenderer.create(this.actionCellTemplate),
      sticky: 'end',
    },
  ]);

  datasource = new PanemuTableDataSource<Order>();
  controller = PanemuTableController.create<Order>(this.columns, this.datasource, {
  });

  constructor(private dataService: AppService, private router: Router) { }

  ngOnInit() {
    this.dataService.getListOrders().subscribe((result: Order[]) => {
      this.controller.maxRows = 20;
      this.datasource.setData(result);

      this.controller.reloadData();
    });
  }

  editOrder(row: Order) {
    this.router.navigate(['/edit_order', row.id]);
  }

  confirmDelete(row: Order) {
    if (confirm(`Are you sure you want to delete order "${row.order_no}"?`)) {
      this.dataService.deleteOrder(row.id).subscribe(() => {
        const allData = this.datasource.getAllData();
        const updatedData = allData.filter((event) => event.id !== row.id);
        this.datasource.setData(updatedData);
        this.controller.reloadData();
      });
    }
  }

  convertToIndonesianDate(dateString: string): string {
    const date = new Date(dateString);

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
