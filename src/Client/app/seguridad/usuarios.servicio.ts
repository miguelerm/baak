import { ConfigurationManager } from '../configuration.manager';
import { Injectable } from '@angular/core'

import { HttpServicio } from '../core/http.servicio';

@Injectable()
export class UsuariosServicio {

    private urlBase: string;

    constructor (private config : ConfigurationManager, private http: HttpServicio) {
        this.establecerUrlBase();
    }

    establecerUrlBase() {
        var config = this.config;
        var apiUrl = config.apiUrl;
        var seguridadUrl = config.servicios.seguridadUrl;
        var seguridadPath = config.servicios.seguridadPath || "";
        this.urlBase = (seguridadUrl || apiUrl) + seguridadPath;
    }

    obtenerUsuarios() : Promise<UsuariosResumen> {
        var url = this.urlBase + '/usuarios';
        return this.http.get<UsuariosResumen>(url);
    }

}

export interface UsuariosResumen {
    elementosPorPagina: number,
    elementos: Array<{}>,
    paginaActual: number,
    paginas: number
}
