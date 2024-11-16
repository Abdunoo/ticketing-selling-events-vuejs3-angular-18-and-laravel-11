import { Component, Input } from '@angular/core';
import { AppService, Events, Order, TicketType, User } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent {
  orderId: number;
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
    user: null,
  };
  users: User[] = [];
  events: Events[] = [];
  selectedEvent: Events | null = null;
  ticketTypes: TicketType[] = [];
  selectedTicketType: TicketType | null = null;

  constructor(
    private dataService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      this.getOrderById(this.orderId);
    }
    this.fetchUsers();
    this.fetchEvents();
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.order).forEach((key) => {
      const value = (this.order as any)[key];

      if (value !== null && value !== undefined) {
        if (typeof value === 'object' && !(value instanceof Date)) {
          // Handle nested objects (e.g., events, user)
          // formData.append(key, JSON.stringify(value));
        } else {
          formData.append(
            key,
            value instanceof Date ? value.toISOString() : value.toString()
          );
        }
      }
    });
    this.dataService.updateOrder(this.orderId, formData).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }

  getOrderById(orderId: number) {
    this.dataService.getOrderById(orderId).subscribe((order) => {
      this.order = order;
      let p = this.order.events?.ticket_types.filter(
        (t) => t.name === order.ticket_type
      );
      if (p && p.length > 0) {
        this.selectedTicketType = p[0];
        this.order.ticket_type = this.selectedTicketType.name;
        console.log(this.order.ticket_type);
        this.ticketTypes = p;
      }
    });
  }

  fetchUsers() {
    this.dataService.getListUsers().subscribe((users) => {
      this.users = users;
    });
  }

  fetchEvents() {
    this.dataService.getListEvents().subscribe((events) => {
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
