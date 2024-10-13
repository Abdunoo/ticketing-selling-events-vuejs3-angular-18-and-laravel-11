import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import {
  PanemuTableController,
  PanemuTableDataSource,
  PanemuTableService,
  ColumnType,
  DefaultCellRenderer,
} from 'ngx-panemu-table';
import { AppService, Event } from '../app.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss', '../shared/styles/common-styles.scss'],
})
export class EventsComponent implements OnInit {
  title = 'Events';
  descTemplate = viewChild<TemplateRef<any>>('descTemplate');
  pts = inject(PanemuTableService);
  columns = this.pts.buildColumns<Event>([
    { field: 'id',width:50, type: ColumnType.INT },
    { field: 'name', width:300 },
    { field: 'description',width:300, cellStyle: ()=> 'white-space: normal;', cellRenderer: DefaultCellRenderer.create(this.descTemplate) },
    { field: 'start_datetime', width:200, type: ColumnType.DATETIME },
    { field: 'end_datetime', width:200, type: ColumnType.DATETIME },
    { field: 'location' },
    { field: 'image_banner' },
    { field: 'is_active', type: ColumnType.MAP, valueMap: { 1: 'Active', 0: 'Inactive' } },
    { field: 'updated_at', type: ColumnType.DATETIME },
  ]);

  datasource = new PanemuTableDataSource<Event>();
  controller = PanemuTableController.create<Event>(this.columns, this.datasource, {
    rowOptions: {rowStyle: () => 'height: 64px; max-height: 64px;'}
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
}
