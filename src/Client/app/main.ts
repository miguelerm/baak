import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import { Configuracion } from './configuracion';
import { ConfigurationManager } from './configuration.manager'
import { AutorizacionServicio } from './autenticacion';

var configData = require('./config.json!json') as Configuracion;
var config = new ConfigurationManager(configData);
var autorizacion = new AutorizacionServicio(config.autenticacion);

if (!autorizacion.estaAutorizado()) {
    autorizacion.autorizar();
} else {
  autorizacion.enableSilentRenew();

  if (config.esProduccion()) {
    enableProdMode();
  }

  window['__configurationManager'] = config;
  platformBrowserDynamic().bootstrapModule(AppModule);
}