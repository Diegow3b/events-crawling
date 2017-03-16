import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../../../class/evento';

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

    eventos: Evento[];
    _id: string;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
    slug: string;
    description: string;

    constructor(private eventosService: EventosService) {
        this.eventosService.getEventos()
            .subscribe(eventos => {
                this.eventos = eventos;
            });
    }

    limparForm(){
      this.title = '';
      this.location = '';
      this.start_date = '';
      this.end_date = '';
      this.slug = '';
      this.description = '';
    }

    addEvento(event) {
        event.preventDefault();
        var newEvento = {
            title: this.title,
            location: this.location,
            start_date: this.start_date,
            end_date: this.end_date,
            slug: this.slug,
            description: this.description
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
            start_date: this.start_date,
            end_date: this.end_date,
            slug: this.slug,
            description: this.description
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
        this.start_date = evento.start_date;
        this.end_date = evento.end_date;
        this.description = evento.description;
    }

    ngOnInit() {
    }

}
