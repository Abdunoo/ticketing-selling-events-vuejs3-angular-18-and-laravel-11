import { Component, inject, OnInit } from '@angular/core';
import {
  PanemuTableController,
  PanemuTableDataSource,
  PanemuTableService,
  ColumnType,
} from 'ngx-panemu-table';
import { AppService, Event } from '../app.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss', '../shared/styles/common-styles.scss'],
})
export class EventsComponent implements OnInit {
  title = 'Events';
  pts = inject(PanemuTableService);
  columns = this.pts.buildColumns<Event>([
    { field: 'id', width: 50, type: ColumnType.INT },
    { field: 'name', 
      label: "Name",
      width: 200
    },
    {
      field: 'description',
      label: 'Description',
      width: 300,
      cellStyle: () => 'white-space: normal; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;', // Limit to 3 lines with ellipsis
    },
    { field: 'start_datetime', 
      label: 'Start',
      width: 200, 
      type: ColumnType.DATETIME,
      formatter: (row)=>this.convertToIndonesianDate(row)
    },
    { field: 'end_datetime', 
      label: 'End',
      width: 200, 
      type: ColumnType.DATETIME,
      formatter: (row)=>this.convertToIndonesianDate(row)
    },
    { field: 'location' },
    { field: 'image_banner' },
    { field: 'is_active', type: ColumnType.MAP, valueMap: { 1: 'Active', 0: 'Inactive' } },
    { field: 'created_at', 
      type: ColumnType.DATETIME,
      formatter: (row)=>this.convertToIndonesianDate(row)
    },
  ]);

  datasource = new PanemuTableDataSource<Event>();
  controller = PanemuTableController.create<Event>(this.columns, this.datasource, {
    rowOptions: { rowStyle: () => 'height: auto; max-height: 64px;' }, // Allow dynamic row height
  });

  constructor(private dataService: AppService) {}

  ngOnInit() {
    // Retrieve events from server via the DataService
    this.dataService.getListEvents().subscribe((result: Event[]) => {
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
