import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { LoginComponent } from './login/login.component';
import { EventosDetailComponent } from './eventos-detail/eventos-detail.component';

export const router: Routes = [
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: 'events', component: EventosComponent },
    { path: 'events-detail/:id', component: EventosDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: EventosComponent }, //TODO
    { path: 'contact', component: EventosComponent } //TODO
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
