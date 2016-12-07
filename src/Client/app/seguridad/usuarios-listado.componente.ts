import { Component, OnInit } from '@angular/core';
import { UsuariosServicio } from './usuarios.servicio';

@Component({
    template: `
        <h2>Usuarios Listado</h2>
        <ul class="items">
            <li *ngFor="let usuario of usuarios">
                <span class="badge">{{ usuario.id }}</span> {{ usuario.nombre }}
            </li>
        </ul>
    `
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
