import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { CreateEventComponent } from './events/form/create-event.component';
import { LoginComponent } from './login/login.component';
import { EditEventComponent } from './events/form/edit/edit-event.component';

export const routes: Routes = [
  // page
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent , data: { title: 'Dashboard', name:'Dashboard' } },
  { path: 'events', component: EventsComponent, data: { title: 'Events' } },
  { path: 'orders', component: OrdersComponent, data: { title: 'Orders' } },
  { path: 'users', component: UsersComponent, data: { title: 'Users' } },

  // form
  { path: 'create_event', component: CreateEventComponent, data: { title: 'Create_Event' } },
  { path: 'edit_event/:id', component: EditEventComponent },

  // auth
  { path: 'login', component: LoginComponent },


  // not found
  { path: '**', component: PageNotFoundComponent },
];
