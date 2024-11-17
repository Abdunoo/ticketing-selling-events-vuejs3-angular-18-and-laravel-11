// src/app/users/users.component.ts
import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { AppService, User } from '../app.service';
import { ColumnType, DefaultCellRenderer, PanemuTableController, PanemuTableDataSource, PanemuTableService } from 'ngx-panemu-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../shared/styles/common-styles.scss']
})
export class UsersComponent {
  title = 'Users';
  pts = inject(PanemuTableService);
  actionCellTemplate = viewChild<TemplateRef<any>>('actionCellTemplate');
  columns = this.pts.buildColumns<User>([
    { field: 'id',type: ColumnType.INT },
    { field: 'name',type: ColumnType.STRING },
    { field: 'email',type: ColumnType.STRING },
    { field: 'role',type: ColumnType.STRING },
    { field: 'created_at',
      type: ColumnType.DATETIME,
      formatter: (row)=>this.convertToIndonesianDate(row)
    },
    {
      type: ColumnType.COMPUTED,
      formatter: () => '',
      cellRenderer: DefaultCellRenderer.create(this.actionCellTemplate),
      sticky: 'end',
    },
    // { field: 'avatar',type: ColumnType.STRING },
  ]);

  datasource = new PanemuTableDataSource<User>();
  controller = PanemuTableController.create<User>(this.columns, this.datasource, {
    // rowOptions: { rowStyle: () => 'height: auto; max-height: 64px;' }, // Allow dynamic row height
  });

  constructor(private dataService: AppService, private router: Router) { }

  ngOnInit() {
    // Retrieve events from server via the DataService
    this.dataService.getListUsers().subscribe((result: User[]) => {
      // Set the data to the data source
      this.controller.maxRows = 20;
      this.datasource.setData(result);

      // Render the data in table by calling reloadData
      this.controller.reloadData();
    });
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


  editUser(row: User) {
    this.router.navigate(['/edit_user', row.id]);
  }

  confirmDelete(row: User) {
    if (confirm(`Are you sure you want to delete user "${row.name}"?`)) {
      this.dataService.deleteUser(row.id).subscribe(() => {
        const allData = this.datasource.getAllData();
        const updatedData = allData.filter((user) => user.id !== row.id);
        this.datasource.setData(updatedData);
        this.controller.reloadData();
      });
    }
  }
}
