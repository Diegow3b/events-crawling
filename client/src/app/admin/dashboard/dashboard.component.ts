import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../../../class/evento';
import { cubeGraph } from '../../../../class/cube';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    eventos: Evento[];
    cubeGraph: cubeGraph[];
    teste: string = 'ola';

    constructor(private eventosService: EventosService) {
        this.loadAdminCss();

        this.cubeGraph = new Array();
    }

    ngOnInit() {
        this.getAllEventosAdmin();
        this.cubeGraph.push(new cubeGraph("Eventos", 35, 'aqua', 'ion-calendar'));
        this.cubeGraph.push(new cubeGraph("Users", 75, 'yellow', 'ion-person-stalker'));
    }

    loadAdminCss(){
        this.loadCSS('../src/static/admin/css/AdminLTE.css');
        this.loadCSS('../src/static/admin/css/skins/_all-skins.css');
        this.loadCSS('../src/static/admin/css/skins/skin-blue.min.css');
    }

    loadCSS(url) {
        // Create link
        let link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        link.type = 'text/css';

        let head = document.getElementsByTagName('head')[0];
        let links = head.getElementsByTagName('link');
        let style = head.getElementsByTagName('style')[0];

        // Check if the same style sheet has been loaded already.
        let isLoaded = false;
        for (var i = 0; i < links.length; i++) {
            var node = links[i];
            if (node.href.indexOf(link.href) > -1) {
                isLoaded = true;
            }
        }
        if (isLoaded) return;
        head.insertBefore(link, style);
    }

    getAllEventosAdmin() {
        this.eventosService.getEventos()
            .subscribe(eventos => {
                this.eventos = eventos;
            });
    }

}
