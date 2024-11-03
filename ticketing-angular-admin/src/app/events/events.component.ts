import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  inject,
  viewChild,
} from '@angular/core';
import {
  PanemuTableController,
  PanemuTableDataSource,
  PanemuTableService,
  ColumnType,
  DefaultCellRenderer,
} from 'ngx-panemu-table';
import { AppService, Events } from '../app.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss', '../shared/styles/common-styles.scss'],
})
export class EventsComponent implements OnInit {
  title = 'Events';
  pts = inject(PanemuTableService);

  // Define @ViewChild to reference the action buttons template
  actionCellTemplate = viewChild<TemplateRef<any>>('actionCellTemplate');

  columns = this.pts.buildColumns<Events>([
    { field: 'id', width: 75, type: ColumnType.INT },
    { field: 'name', label: 'Name', width: 200 },
    {
      field: 'description',
      label: 'Description',
      width: 300,
      cellStyle: () =>
        'white-space: normal; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;', // Limit to 3 lines with ellipsis
    },
    {
      field: 'start_datetime',
      label: 'Start',
      width: 200,
      type: ColumnType.DATETIME,
      formatter: (row) => this.convertToIndonesianDate(row),
    },
    {
      field: 'end_datetime',
      label: 'End',
      width: 200,
      type: ColumnType.DATETIME,
      formatter: (row) => this.convertToIndonesianDate(row),
    },
    { field: 'location', label: 'Location' },
    { field: 'image_banner', label: 'Image' },
    {
      field: 'is_active',
      type: ColumnType.MAP,
      valueMap: { 1: 'Active', 0: 'Inactive' },
    },
    {
      field: 'created_at',
      type: ColumnType.DATETIME,
      formatter: (row) => this.convertToIndonesianDate(row),
    },

    {
      type: ColumnType.COMPUTED,
      formatter: (val: any) => '',
      cellRenderer: DefaultCellRenderer.create(this.actionCellTemplate),
      sticky: 'end',
    },
  ]);

  datasource = new PanemuTableDataSource<Events>();
  controller = PanemuTableController.create<Events>(
    this.columns,
    this.datasource,
    {}
  );

  constructor(private dataService: AppService, private router: Router) { }

  ngOnInit() {
    this.dataService.getListEvents().subscribe((result: Events[]) => {
      this.controller.maxRows = 20;
      this.datasource.setData(result);
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

  editEvent(row: Events) {
    this.router.navigate(['/edit_event', row.id]); // Assuming /edit_event/:id is the route to edit event
  }

  // Delete event: Show a confirmation dialog and remove the event
  confirmDelete(row: Events) {
    if (confirm(`Are you sure you want to delete event "${row.name}"?`)) {
      this.dataService.deleteEvent(row.id).subscribe(() => {
        // Remove event from the table data source
        const allData = this.datasource.getAllData();
        const updatedData = allData.filter((event) => event.id !== row.id);
        this.datasource.setData(updatedData);
        this.controller.reloadData();
      });
    }
  }
}
