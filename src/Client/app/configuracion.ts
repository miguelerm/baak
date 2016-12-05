export interface Configuracion {
  ambiente: string,
  apiUrl: string,
  autenticacion:{
    issuer: string;
    authorizationUrl: string;
    jwksUrl: string;
    userInfoUrl: string;
    clientId: string;
    redirectUri: string;
    silentRedirectUri: string;
    responseType: string;
    scope: string;
    tokenStorageKey: string;
  },
  servicios: {
    seguridadPath?: string,
    seguridadUrl?: string
  }
}
