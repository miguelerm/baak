import { CriptografiaServicio, Jsk } from "./criptografia.servicio"

interface TokenResponse {
    access_token: string;
    id_token: string;
    expires_at: string;
    error: string;
    state: string;
}

interface IdToken {
    nonce: string;
}

interface AuthConfiguration {
    issuer: string;
    authorizationUrl: string;
    jwksUrl: string;
    userInfoUrl: string;
    clientId: string;
    redirectUri: string;
    silentRedirectUri: string;
    responseType: string;
    scope: string;
}

interface UserToken {
    expiresAt: number;
    accessToken: string;
    email: string;
    name: string;
    id: number;
}

interface JsksResponse {
    keys: Jsk[],
}

export class AutorizacionServicio {

    private tokenStorageKey: string = "token";

    constructor(private config: AuthConfiguration, private crypto: CriptografiaServicio = null) {
        var t = this;
        this.crypto = this.crypto || new CriptografiaServicio();
    }

    public estaAutorizado(): boolean {
        let now = Date.now() / 1000;
        var token = JSON.parse(sessionStorage.getItem(this.tokenStorageKey) || "null") as UserToken;
        if (!token) return false;
        if (!token.accessToken) return false;
        if (!token.expiresAt) return false;
        if (token.expiresAt < now) return false;

        return true;
    }

    public autorizar(silent: boolean = false) {
        var config = this.config;
        var authorizationUrl = config.authorizationUrl;
        var clientId = encodeURI(config.clientId);
        var redirectUri = encodeURI(silent ? config.silentRedirectUri : config.redirectUri);
        var responseType = encodeURI(config.responseType);
        var scope = encodeURI(config.scope);
        var nonce = encodeURI("N" + Math.random() + "" + Date.now());
        var state = encodeURI(Date.now() + "" + Math.random());

        sessionStorage.setItem("state", state);
        sessionStorage.setItem("nonce", nonce);

        if (!silent) {
            sessionStorage.setItem("location", window.location.toString());
        }

        var url = `${authorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&nonce=${nonce}&state=${state}`;
        window.location.href = url + (silent ? "&prompt=none" : "");
    }

    public canSignin() {
        let hash = window.location.hash.substr(1);
        let tokenResponse = hash.split('&').reduce(function (result, item) {
            let parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {}) as TokenResponse;

        return tokenResponse && tokenResponse.state;
    }

    public signin(): Promise<any> {
        let now = Date.now() / 1000;
        let hash = window.location.hash.substr(1);
        let state = sessionStorage.getItem("state") as string;
        let nonce = sessionStorage.getItem("nonce") as string;
        let issuer = this.config.issuer;
        let audience = this.config.clientId;

        let tokenResponse = hash.split('&').reduce(function (result, item) {
            let parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {}) as TokenResponse;

        console.debug("tokenResponse: ", tokenResponse);

        if (tokenResponse.error) {
            console.error("token error ", tokenResponse.error);
            return Promise.reject(tokenResponse.error);
        }

        if (tokenResponse.state !== state) {
            console.error("State error.");
            return Promise.reject("State error.");
        }

        let accessToken = tokenResponse.access_token;
        let idToken = tokenResponse.id_token;

        if (!accessToken) {
            console.error("Missing access token");
            return Promise.reject("Missing access token");
        }

        let jwt = this.crypto.parseJwsToken(idToken);

        if (!jwt || !jwt.header || !jwt.payload) {
            console.error("Failed to parse id_token", idToken);
            return Promise.reject("Failed to parse id_token");
        }

        if (nonce !== jwt.payload.nonce) {
            console.error("Invalid nonce in id_token");
            return Promise.reject("Invalid nonce in id_token");
        }

        if (issuer !== jwt.payload.iss) {
            console.error("Invalid issuer");
            return Promise.reject("Invalid issuer");
        }

        if (audience !== jwt.payload.aud) {
            console.error("Invalid audience");
            return Promise.reject("Invalid audience");
        }

        console.debug("jwt: ", jwt);

        return new Promise<{}>((resolve, reject) => {

            this.getJson<JsksResponse>(this.config.jwksUrl).then(jsks => {

                console.debug("jsks: ", jsks);

                if (!jsks || !jsks.keys) {
                    console.error("Missing keys on keyset");
                    return reject("Missing keys on keyset");
                }

                if (!this.crypto.verifyJwsToken(idToken, jsks.keys[0])) {
                    console.error("signature validation failed");
                    return reject("signature validation failed");
                }

                // accept tokens issues up to 5 mins ago
                var diff = now - jwt.payload.iat;
                if (diff > (5 * 60)) {
                    console.error("Token issued too long ago");
                    return reject("Token issued too long ago");
                }

                if (jwt.payload.exp < now) {
                    console.error("Token expired");
                    return reject("Token expired");
                }


                if (!jwt.payload.at_hash) {
                    console.error("No at_hash in id_token");
                    return reject("Token expired");
                }

                let hash = this.crypto.hashWithSha256(accessToken);
                let left = hash.substr(0, hash.length / 2);
                let left_b64u = this.crypto.hextob64u(left);

                if (left_b64u !== jwt.payload.at_hash) {
                    console.error("at_hash failed to validate");
                    return reject("at_hash failed to validate");
                }

                var t = this;

                this.getJson(this.config.userInfoUrl, accessToken).then(function (result: any) {

                    var user = {
                        expiresAt: jwt.payload.exp,
                        accessToken: accessToken,
                        email: result.email,
                        name: result.name,
                        id: parseInt(result.sub, 10)
                    };

                    sessionStorage.setItem(t.tokenStorageKey, JSON.stringify(user));

                    console.debug("userinfo endpoint results", user);

                    resolve(user);

                }, reject);

            }, reject);

        });

    }

    public redirectToHome() {
        window.location.href = sessionStorage.getItem("location") || (window.location.protocol + "//" + window.location.host + "/")
    }

    public enableSilentRenew() {
        var iframe = document.createElement("iframe");
        iframe.style.display = 'none';
        iframe.src = this.config.silentRedirectUri;
        document.body.appendChild(iframe);
    }

    public silentRenew() {

        if (this.canSignin()) {
            this.signin().then(() => {
                window.location.href = this.config.silentRedirectUri;
            }, (err) => { console.error(err); });
            return;
        }

        if (!this.estaAutorizado()) {
            this.waitForAuthorization().then(this.RenewTokenWhenItExpires);
        } else {
            this.RenewTokenWhenItExpires();
        }
    }

    public getBearerToken(): string {
        var token = JSON.parse(sessionStorage.getItem(this.tokenStorageKey) || "null") as UserToken;
        return token && token.accessToken;
    }

    private RenewTokenWhenItExpires = () => {
        let fiveMinutes = 1 * 60;
        let now = Date.now() / 1000;
        let token = JSON.parse(sessionStorage.getItem(this.tokenStorageKey) || "null") as UserToken;
        let timeout = Math.floor(token.expiresAt - now - fiveMinutes) * 1000;

        if (timeout <= 0) {
            timeout = 1;
        }

        setTimeout(() => {
            console.log("authorizing...");
            this.autorizar(true);
        }, timeout);

    }

    public waitForAuthorization() {
        var self = this;
        return new Promise((resolve, reject) => {

            function checkAuthorize() {
                console.debug("waiting for autorization...");
                setTimeout(() => {

                    if (self.estaAutorizado()) {
                        console.debug("authorized.")
                        resolve();
                    } else {
                        checkAuthorize();
                    }
                }, 5000);
            }

            checkAuthorize();

        });
    }

    private getJson<T>(url: string, token?: string) {
        return new Promise<T>(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "json";

            xhr.onload = function () {
                try {
                    if (xhr.status === 200) {
                        var response = xhr.response;
                        if (typeof response === "string") {
                            response = JSON.parse(response);
                        }
                        resolve(response);
                    }
                    else {
                        reject(Error(xhr.statusText + "(" + xhr.status + ")"));
                    }
                }
                catch (err) {
                    reject(err);
                }
            };

            xhr.onerror = function () {
                reject(Error("Network Error"));
            }

            xhr.open("GET", url);

            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }

            console.debug("making http request...");
            xhr.send();
        });
    }
}
