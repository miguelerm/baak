import { Configuracion } from './configuracion';

/**
 * Clase que expone la configuracion del sistema
 * y adicionalmente brinda funciones útiles para
 * acceder a la configuracion de forma más semántica.
 */
export class ConfigurationManager implements Configuracion {

  constructor(private configuration : Configuracion) {

  }

  esProduccion() {
    return this.configuration.ambiente === "prod";
  }

  get apiUrl() {
    return this.configuration.apiUrl;
  }
  get servicios() {
    return this.configuration.servicios;
  }

  get ambiente() {
    return this.configuration.ambiente;
  }

  get autenticacion() {
    return this.configuration.autenticacion;
  }

}