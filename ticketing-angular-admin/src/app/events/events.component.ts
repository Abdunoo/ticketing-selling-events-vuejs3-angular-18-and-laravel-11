// src/app/events/events.component.ts
import { Component, inject } from '@angular/core';
import {
  PanemuTableController,
  PanemuTableDataSource,
  PanemuTableService,
} from 'ngx-panemu-table';
import { DATA } from '../app.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss', '../shared/styles/common-styles.scss'],
})
export class EventsComponent {
  title = 'Events';
  pts = inject(PanemuTableService);

  columns = this.pts.buildColumns<any>([
    { field: 'id' },
    { field: 'name' },
    { field: 'slug' },
    { field: 'description' },
    { field: 'start_datetime' },
    { field: 'end_datetime' },
    { field: 'location' },
    { field: 'image_banner' },
    { field: 'organizer_id' },
    { field: 'is_active' },
    { field: 'price' },
    { field: 'created_at' },
    { field: 'updated_at' },
    { field: 'ticket_types' },
  ]);

  controller = PanemuTableController.create(
    this.columns,
    new PanemuTableDataSource(DATA)
  );

  constructor() {}

  ngOnInit() {
    this.controller.reloadData();
  }
}
