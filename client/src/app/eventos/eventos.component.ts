import { Component, ViewChild, ElementRef, OnInit, Pipe, PipeTransform } from '@angular/core';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../../../class/evento';

import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

    eventos: Evento[];
    eventosQuant: number;

    // @ViewChild('input_category')
    // input_category: ElementRef;

    // @ViewChild('input_city')
    // input_city: ElementRef;

    _id: string;
    title: string;
    location: string;
    city: string;
    start_date: any = new Date();
    end_date: any = new Date();
    slug: string;
    description: string;
    imagem: string;
    category: string;

    dateFilter: string;
    cityFilter: string;
    categoryFilter: string;

    defaultImage: string;

    constructor(private eventosService: EventosService, private sanitizer: DomSanitizer) {

        this.getAllEventos();

        this.defaultImage = 'https://d1gkntzr8mxq7s.cloudfront.net/58c9e8b1161a2-xs.jpg';
    }

    sanitizeSafeStyle(url: string) {
        if(url) {
            return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
        } else {
            return null;
        }
    }

    filterEvents(){
      event.preventDefault();
      var filter = {
          category: this.categoryFilter,
          city: this.cityFilter,
          date: this.dateFilter
      }

      this.eventosService.filterEvento(filter)
            .subscribe(eventos => {
                this.eventos = eventos;
                if(eventos) this.eventosQuant = eventos.length;
                console.log("Returning");
                console.log(eventos);
            });

    }

    setDateFilter(event){
      this.dateFilter = event.target.attributes[1].value
    }

    limparForm() {
        this.title = '';
        this.location = '';
        this.start_date = '';
        this.end_date = '';
        this.slug = '';
        this.description = '';
        this.category = '';
    }

    getAllEventos(){
        this.eventosService.getEventos()
            .subscribe(eventos => {
                this.eventos = eventos;
                this.eventosQuant = eventos.length;
            });
    }

    addEvento(event) {
        event.preventDefault();
        var newEvento = {
            title: this.title,
            location: this.location,
            city: this.city,
            start_date: this.start_date, /**add as Date */
            end_date: this.end_date, /**add as Date */
            slug: this.slug,
            description: this.description,
            imagem: this.imagem,
            category: this.category
        }

        this.eventosService.addEvento(newEvento)
            .subscribe(evento => {
                this.eventos.push(evento);
                this.limparForm();
            });

    }

    deleteEvento(id) {
        var eventos = this.eventos;

        this.eventosService.deleteEvento(id).subscribe(data => {
            for (var i = 0; i < eventos.length; i++) {
                if (eventos[i]._id == id) {
                    eventos.splice(i, 1);
                }
            }
        });
    }

    updateEvento() {
        let _evento = {
            _id: this._id,
            title: this.title,
            location: this.location,
            city: this.city,
            start_date: this.start_date,
            end_date: this.end_date,
            slug: this.slug,
            description: this.description,
            imagem: this.imagem,
            category: this.category
        };
        this.eventosService.updateEvento(_evento)
            .subscribe(data => {
                // TO DO Mostrar Mensagem de Alteração com Sucesso
                var eventos = this.eventos;

                for (var i = 0; i < eventos.length; i++) {
                    if (eventos[i]._id.toString() == _evento._id) eventos[i].title = _evento.title
                }
                this.limparForm();
            })
    }

    DOMloadEditEvento(evento) {
        this._id = evento._id;
        this.title = evento.title;
        this.location = evento.location;
        this.city = evento.city;
        this.start_date = evento.start_date; /**add as Date */
        this.end_date = evento.end_date; /**add as Date */
        this.description = evento.description;
        this.category = evento.category;
    }

    ngOnInit() {
      // let categoryObservable = Observable.fromEvent(this.input_category.nativeElement, 'keyup');
      // let cityObservable = Observable.fromEvent(this.input_city.nativeElement, 'keyup');

      // categoryObservable.subscribe();
      // cityObservable.subscribe();
    }

}

// @Pipe({
//   name: 'searchPipe',
//   pure: false
// })
// export class SearchPipe implements PipeTransform {
//   transform(eventos: Evento[], searchKeys: any): any[] {
//       let category = searchKeys.category.toLowerCase();
//       let city = searchKeys.city.toLowerCase();

//       if (!eventos) return

//       return eventos.filter(item => {
//           return item.category.toLowerCase() == category &&
//                  item.city.toLowerCase() == city;
//       });
//   }
// }
