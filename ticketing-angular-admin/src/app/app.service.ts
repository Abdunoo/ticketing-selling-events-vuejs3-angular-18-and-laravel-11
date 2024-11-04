import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environment.prod';
// import { environment } from '../environment';
export interface Events {
  id: number;
  name: string;
  slug?: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  image_banner: string;
  organizer_id?: number;
  is_active?: boolean;
  price?: string;
  created_at?: string;
  updated_at?: string;
  ticket_types?: [TicketType];
}

export interface TicketType {
  id?: number;
  event_id?: number;
  name: string;
  price: string;
  available_quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: number;
  user_id: number;
  discount_amount: string;
  total_price: string;
  payment_status: string;
  event_id: number;
  ticket_type: string;
  quantity: number;
  price: string;
  order_no: string;
  url_invoice: string;
  pay_date: Date | null;
  payment_method: string | null;
  bank: string | null;
  no_rek: string | null;
  name_of: string | null;
  created_at: Date;
  updated_at: Date;
  events: Event;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  private tokenKey = 'authToken';
  private userKey = 'userData';

  getMonthlyCounts(): Observable<any> {
    const url = environment.apiUrl + '/admin/dashboard/getMonthlyCounts';
    return this.http.get<any>(url);
  }

  getListEvents(): Observable<Events[]> {
    const url = environment.apiUrl + '/admin/events';
    return this.http.get<Events[]>(url);
  }

  getEventById(eventId: number): Observable<Events> {
    const url = `${environment.apiUrl}/admin/events/${eventId}`;
    return this.http.get<Events>(url);
  }

  createEvent(eventData: FormData): Observable<Events> {
    const url = environment.apiUrl + '/admin/events';
    return this.http.post<Events>(url, eventData);
  }

  updateEvent(eventId: number, event: FormData): Observable<Events> {
      const url = `${environment.apiUrl}/admin/events/${eventId}`;
      return this.http.put<Events>(url, event);
  }

  deleteEvent(eventId: number): Observable<void> {
    const url = `${environment.apiUrl}/admin/events/${eventId}`;
    return this.http.delete<void>(url);
  }

  // Order CRUD Methods

  getListOrders(): Observable<Order[]> {
    const url = environment.apiUrl + '/admin/orders';
    return this.http.get<Order[]>(url);
  }

  getOrderById(orderId: number): Observable<Order> {
    const url = `${environment.apiUrl}/admin/orders/${orderId}`;
    return this.http.get<Order>(url);
  }

  createOrder(order: Order): Observable<Order> {
    const url = environment.apiUrl + '/admin/orders';
    return this.http.post<Order>(url, order);
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    const url = `${environment.apiUrl}/admin/orders/${orderId}`;
    return this.http.put<Order>(url, order);
  }

  deleteOrder(orderId: number): Observable<void> {
    const url = `${environment.apiUrl}/admin/orders/${orderId}`;
    return this.http.delete<void>(url);
  }

  // User CRUD Methods

  getListUsers(): Observable<User[]> {
    const url = environment.apiUrl + '/admin/users';
    return this.http.get<User[]>(url);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${environment.apiUrl}/admin/users/${userId}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    const url = environment.apiUrl + '/admin/users';
    return this.http.post<User>(url, user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    const url = `${environment.apiUrl}/admin/users/${userId}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${environment.apiUrl}/admin/users/${userId}`;
    return this.http.delete<void>(url);
  }

  // Categories

  getListCategories(): Observable<User[]> {
    const url = environment.apiUrl + '/categories/list';
    return this.http.get<User[]>(url);
  }

  // auth
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl+ '/login', { email, password }).pipe(
      tap(response => {
        if (response && response.code === 200 && response.data.access_token) {
          // Store token and user data in localStorage
          localStorage.setItem(this.tokenKey, response.data.access_token);
          localStorage.setItem(this.userKey, JSON.stringify(response.data.user));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem(this.userKey) || '{}');
  }
}
