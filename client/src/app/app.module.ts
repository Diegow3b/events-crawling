import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EventosService } from './services/eventos.service';

import { routes } from './app.router';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    LoginComponent
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
