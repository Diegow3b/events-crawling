import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EventosService } from './services/eventos.service';

import { routes } from './app.router';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { LoginComponent } from './login/login.component';
import { EventosDetailComponent } from './eventos-detail/eventos-detail.component';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { GraphsComponent } from './admin/graphs/graphs.component';
import { EventosAddComponent } from './admin/eventos/eventos-add/eventos-add.component';
import { EventosListComponent } from './admin/eventos/eventos-list/eventos-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    LoginComponent,
    EventosDetailComponent,
    DashboardComponent,
    GraphsComponent,
    AdminComponent,
    EventosAddComponent,
    EventosListComponent
    // SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers:[EventosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
