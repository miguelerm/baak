import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpServicio } from "./http.servicio";
import { UsuarioServicio } from './usuario.servicio';

@NgModule({
  imports:      [ CommonModule, FormsModule, HttpModule ],
  providers:    [ UsuarioServicio, HttpServicio ]
})
export class CoreModulo { }