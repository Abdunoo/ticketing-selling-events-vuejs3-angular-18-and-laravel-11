// create-order.component.ts
import { Component, OnInit } from '@angular/core';
import { AppService, Events, Order, TicketType, User } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  order: Order = {
    id: 0,
    user_id: 0,
    discount_amount: 0,
    total_price: 0,
    payment_status: '',
    event_id: 0,
    ticket_type: '',
    quantity: 1,
    price: 0,
    order_no: '',
    url_invoice: '',
    pay_date: null,
    payment_method: '',
    bank: '',
    no_rek: '',
    name_of: '',
    created_at: null,
    updated_at: null,
    events: null,
    user: null
  };
  users: User[] = [];
  events: Events[] = [];
  selectedEvent: Events | null = null;
  ticketTypes: TicketType[] = [];

  constructor(private dataService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchEvents();
  }

  onSubmit() {
    console.log('Order Created:', this.order);
    this.dataService.createOrder(this.order).subscribe(
      () => {
        this.router.navigate(["/orders"]);
      }
    )
  }

  fetchUsers() {
    this.dataService.getListUsers().subscribe(users => {
      this.users = users;
    });
  }

  fetchEvents() {
    this.dataService.getListEvents().subscribe(events => {
      this.events = events;
    });
  }

  fetchEventById(id: number) {
    this.dataService.getEventById(id).subscribe((data) => {
      this.selectedEvent = data;
      this.ticketTypes = this.selectedEvent.ticket_types;
    });
  }

  onUserChange(userId: number) {
    this.order.user_id = userId;
    console.log('User changed:', userId);
  }

  onEventChange(eventId: number) {
    this.fetchEventById(eventId);
  }

  onTicketTypeChange(selectedTicketType: TicketType) {
    if (selectedTicketType) {
      this.order.ticket_type = selectedTicketType.name;
      this.order.price = selectedTicketType.price;
      this.order.total_price = this.order.quantity * selectedTicketType.price;
    }
  }

  onQtyChange(qty: number) {
    this.order.quantity = qty;
    this.order.total_price = qty * this.order.price;
  }
}
