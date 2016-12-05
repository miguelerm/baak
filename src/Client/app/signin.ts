import { Configuracion } from './configuracion';
import { ConfigurationManager } from './configuration.manager';
import { AutorizacionServicio } from './autenticacion';

var configData = require('./config.json!json') as Configuracion;
var config = new ConfigurationManager(configData);
var autorizacion = new AutorizacionServicio(config.autenticacion);

if (!autorizacion.estaAutorizado()) {
    autorizacion.signin().then(autorizacion.redirectToHome);
} else {
    autorizacion.redirectToHome();
}
