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
    { field: 'id', type: ColumnType.INT },
    { field: 'name' },
    { field: 'description' },
    { field: 'start_datetime', type: ColumnType.DATETIME },
    { field: 'end_datetime', type: ColumnType.DATETIME },
    { field: 'location' },
    { field: 'image_banner' },
    { field: 'organizer_id', type: ColumnType.INT },
    { field: 'is_active', type: ColumnType.MAP, valueMap: { 1: 'Active', 0: 'Inactive' } },
    { field: 'created_at', type: ColumnType.DATETIME },
    { field: 'updated_at', type: ColumnType.DATETIME },
  ]);

  datasource = new PanemuTableDataSource<Event>();
  controller = PanemuTableController.create<Event>(this.columns, this.datasource);

  constructor(private dataService: AppService) {}

  ngOnInit() {
    // Retrieve events from server via the DataService
    this.dataService.getListEvents().subscribe((result: Event[]) => {
      // Set the data to the data source
      this.datasource.setData(result);

      // Render the data in table by calling reloadData
      this.controller.reloadData();
    });
  }
}
