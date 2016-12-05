import { Injectable } from '@angular/core';

import { ConfigurationManager } from '../configuration.manager';

interface UserToken {
    expiresAt: number;
    accessToken: string;
    email: string;
    name: string;
    id: number;
}

@Injectable()
export class UsuarioServicio {

    constructor(private config: ConfigurationManager) {

    }

    public getBearerToken(): string {
        var storageKey = this.config.autenticacion.tokenStorageKey;
        var storageItem = sessionStorage.getItem(storageKey);
        var token = JSON.parse(storageItem || "null") as UserToken;
        return token && token.accessToken;
    }

}