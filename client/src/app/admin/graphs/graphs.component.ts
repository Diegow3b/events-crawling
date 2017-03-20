import { Component, Input, OnInit } from '@angular/core';
import { cubeGraph } from '../../../../class/cube';

@Component({
    selector: 'app-graphs',
    templateUrl: './graphs.component.html',
    styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

    @Input() cubes: cubeGraph[];

    constructor() {
    }

    ngOnInit() {
    }

}
