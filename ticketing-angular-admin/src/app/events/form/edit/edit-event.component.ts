import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService, Category, Events, TicketType, User } from '../../../app.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  eventId: number;
  newEvent: Events = {} as Events;
  ticketTypes: Array<TicketType> = [{ name: '', price: 0, available_quantity: 0 }];
  categories: Array<Category> = [];
  users: Array<User> = [];
  imageUrl: string;
  filename: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataService: AppService
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.eventId) {
      this.loadEventData(this.eventId);
    }
    this.fetchUsers();
    this.getCategories();
  }

  loadEventData(id: number): void {
    try {
      this.dataService.getEventById(id).subscribe(
        (data: Events) => {
          this.newEvent = data;
          this.ticketTypes = data.ticket_types || [];
          this.imageUrl = data.image_banner;
        },

      );
    } catch (error) {
      console.error('Error loading event:', error);
    }

  }

  fetchUsers() {
    this.dataService.getListUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  getCategories() {
    try {
      this.dataService.getListCategories().subscribe((data: Category[]) => {
        this.categories = data
      });
    } catch (error) {
      console.log(error);
    }
  }

  addTicketType() {
    this.ticketTypes.push({ name: '', price: 0, available_quantity: 0 });
  }

  removeTicketType(index: number) {
    this.ticketTypes.splice(index, 1);
  }

  // create-event.component.ts

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      const maxSize = 5 * 1024 * 1024; // 2MB size limit
      if (file.size > maxSize) {
        this.errorMessage = 'File size exceeds 2MB';
        this.filename = '';
        this.imageUrl = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Set the preview URL
        this.filename = file.name;
        this.errorMessage = '';
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit() {
    const formData = new FormData();
    Object.keys(this.newEvent).forEach((key) => {
      formData.append(key, (this.newEvent as any)[key]);
    });
    formData.append('ticket_types', JSON.stringify(this.ticketTypes));
    const uploadInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (uploadInput.files && uploadInput.files.length > 0) {
      console.log('true')
      formData.append('image_banner', uploadInput.files[0]);
    }

    this.dataService.updateEvent(this.eventId, formData).subscribe(
        () => {
            this.router.navigate(['/events']);
        },
        (error) => {
            console.error('Error updating event:', error);
        }
    );
}

}
