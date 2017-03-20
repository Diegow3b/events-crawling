import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { LoginComponent } from './login/login.component';
import { EventosDetailComponent } from './eventos-detail/eventos-detail.component';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { GraphsComponent } from './admin/graphs/graphs.component';
import { EventoslistComponent } from './admin/eventos/eventoslist/eventoslist.component';

export const router: Routes = [
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: 'events', component: EventosComponent },
    { path: 'events-detail/:id', component: EventosDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: EventosComponent }, //TODO
    { path: 'contact', component: EventosComponent }, //TODO

    { path: 'admin', component: AdminComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'events/list', component: EventoslistComponent }
    ]},

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
