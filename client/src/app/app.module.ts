import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';

import { EventosService } from './services/eventos.service';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent
    // SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers:[EventosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
