import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap, catchError, of } from 'rxjs';
// import { environment } from '../environment';
import { environment } from '../environment.prod';

export interface Events {
  id: number;
  name: string;
  slug?: string;
  description: string;
  category: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  image_banner: string;
  organizer_id: number;
  is_active?: boolean;
  price?: number;
  created_at?: string;
  updated_at?: string;
  ticket_types: TicketType[];
}

export interface TicketType {
  id?: number;
  event_id?: number;
  name: string;
  price: number;
  available_quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: number;
  user_id: number;
  discount_amount: number;
  total_price: number;
  payment_status: string;
  event_id: number;
  ticket_type: string;
  quantity: number;
  price: number;
  order_no: string;
  url_invoice: string;
  pay_date: Date | null;
  payment_method: string | null;
  bank: string | null;
  no_rek: string | null;
  name_of: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  events: Events | null;
  user: User | null;
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

export interface Category {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface resData<T = any> {
  code: number;
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'userData';
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleResponse<T>(response: resData<T>): T {
    if (response.code === 200) return response.data;
    throw new Error(response.message || 'API request failed');
  }

  private handleError<T>(error: any, defaultValue: T): Observable<T> {
    console.error('API error:', error);
    return of(defaultValue);
  }

  // Dashboard
  getMonthlyCounts(): Observable<any> {
    return this.http.get<resData<any>>(`${this.apiUrl}/admin/dashboard/getMonthlyCounts`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {}))
    );
  }

  // Event CRUD Methods
  getListEvents(): Observable<Events[]> {
    return this.http.get<resData<Events[]>>(`${this.apiUrl}/admin/events`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getEventById(eventId: number): Observable<Events> {
    return this.http.get<resData<Events>>(`${this.apiUrl}/admin/events/${eventId}`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as Events))
    );
  }

  createEvent(eventData: FormData): Observable<Events> {
    return this.http.post<resData<Events>>(`${this.apiUrl}/admin/events`, eventData).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as Events))
    );
  }

  updateEvent(eventId: number, event: FormData): Observable<Events> {
    return this.http.put<resData<Events>>(`${this.apiUrl}/admin/events/${eventId}`, event).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as Events))
    );
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/events/${eventId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // Order CRUD Methods
  getListOrders(): Observable<Order[]> {
    return this.http.get<resData<Order[]>>(`${this.apiUrl}/admin/orders`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<resData<Order>>(`${this.apiUrl}/admin/orders/${orderId}`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as Order))
    );
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<resData<Order>>(`${this.apiUrl}/admin/orders`, order).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as Order))
    );
  }

  updateOrder(orderId: number, order: FormData): Observable<Order> {
    return this.http.put<resData<Order>>(`${this.apiUrl}/admin/orders/${orderId}`, order).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as Order))
    );
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/orders/${orderId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // User CRUD Methods
  getListUsers(): Observable<User[]> {
    return this.http.get<resData<User[]>>(`${this.apiUrl}/admin/users`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<resData<User>>(`${this.apiUrl}/admin/users/${userId}`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as User))
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<resData<User>>(`${this.apiUrl}/admin/users`, user).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as User))
    );
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<resData<User>>(`${this.apiUrl}/admin/users/${userId}`, user).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, {} as User))
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/users/${userId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // Categories
  getListCategories(): Observable<Category[]> {
    return this.http.get<resData<Category[]>>(`${this.apiUrl}/categories/list`).pipe(
      map((res) => this.handleResponse(res)),
      catchError((error) => this.handleError(error, []))
    );
  }

  // Auth
  login(email: string, password: string): Observable<any> {
    return this.http.post<resData<{ access_token: string; user: User }>>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        if (res.code === 200 && res.data.access_token) {
          localStorage.setItem(this.tokenKey, res.data.access_token);
          localStorage.setItem(this.userKey, JSON.stringify(res.data.user));
        } else {
          throw new Error('Login failed');
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserData(): User | null {
    return JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }
}
