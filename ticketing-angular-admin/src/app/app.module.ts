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
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    PanemuTableComponent, 
    PanemuPaginationComponent, 
    PanemuQueryComponent
  ],
  declarations: [
    AppComponent, 
    DashboardComponent,
    EventsComponent,
    OrdersComponent,
    UsersComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [provideHttpClient()]
})
export class AppModule {}
