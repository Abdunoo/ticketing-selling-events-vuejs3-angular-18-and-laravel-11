// create-event.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService, Events } from '../../app.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  newEvent = {
    name: '',
    category: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    description: '',
  };
  ticketTypes: Array<any> = [{ name: '', price: '', available_quantity: '' }];
  categories: Array<any> = [];
  imageUrl: string | null = null;
  filename: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: AppService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    try {
      this.dataService.getListCategories().subscribe((data: any) => {
        this.categories = data.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  addTicketType() {
    this.ticketTypes.push({ name: '', price: '', available_quantity: '' });
  }

  removeTicketType(index: number) {
    this.ticketTypes.splice(index, 1);
  }

  // create-event.component.ts

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB size limit
      if (file.size > maxSize) {
        this.errorMessage = 'File size exceeds 2MB';
        this.filename = '';
        this.imageUrl = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Set the preview URL
        this.filename = file.name;
        this.errorMessage = '';
      };
      reader.readAsDataURL(file); // Read the file as a data URL
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
      formData.append('image_banner', uploadInput.files[0]);
    }

    try {
      this.dataService.createEvent(formData).subscribe(
        () => {
          this.router.navigate(['/events']);
        }
      );
    } catch (error) {
      console.error(error);
    }


  }
}