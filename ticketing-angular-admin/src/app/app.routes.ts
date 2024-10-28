import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent , data: { title: 'Dashboard', name:'Dashboard' } },
  { path: 'events', component: EventsComponent, data: { title: 'Events' } },
  { path: 'orders', component: OrdersComponent, data: { title: 'Orders' } },
  { path: 'users', component: UsersComponent, data: { title: 'Users' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
