import { Component, OnInit } from '@angular/core';
import { UsuariosServicio } from './usuarios.servicio';

@Component({
    templateUrl: 'app/seguridad/usuarios-listado.template.html'
})
export class UsuariosListadoComponente implements OnInit {

    public usuarios: Array<{}>

    constructor(private svc: UsuariosServicio) {

    }

    ngOnInit() {
        this.svc.obtenerUsuarios().then(usuarios => {
            this.usuarios = usuarios.elementos;
        });
    }
}
