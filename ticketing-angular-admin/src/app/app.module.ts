import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PanemuPaginationComponent, PanemuQueryComponent, PanemuTableComponent } from 'ngx-panemu-table';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateEventComponent } from './events/form/create-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { EditEventComponent } from './events/form/edit/edit-event.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    PanemuTableComponent,
    PanemuPaginationComponent,
    PanemuQueryComponent,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EventsComponent,
    OrdersComponent,
    UsersComponent,
    PageNotFoundComponent,
    SidebarComponent,
    HeaderComponent,
    CreateEventComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    EditEventComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    provideHttpClient(),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
})
export class AppModule {}
