import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosServicio } from "./usuarios.servicio";
import { UsuariosListadoComponente } from "./usuarios-listado.componente";

const routes: Routes = [
  { path: 'seguridad/usuarios', component: UsuariosListadoComponente }
];

@NgModule({
  imports:      [ 
    CommonModule, 
    FormsModule,
    RouterModule.forChild(routes) 
  ],
  declarations: [
    UsuariosListadoComponente
  ],
  providers:    [ UsuariosServicio ]
})
export class SeguridadModulo { }