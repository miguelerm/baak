declare var KJUR:any;
declare var KEYUTIL: any;
declare function hextob64u(str: string): string;

/*
Considerar implementar las siguientes funciones en el codigo local:

KJUR.jws.JWS.parse
KJUR.jws.JWS.verify
KJUR.crypto.Util.sha256
hextob64u
KEYUTIL.getKey

*/

export interface Jsk {
    kid: string;
    use: string;
    x5c: string[];
}

export interface JwsToken {
    header: {},
    payload: {
        nonce: string,
        iss: string,
        aud: string,
        iat: number,
        exp: number,
        at_hash: string
    }
}

export class CriptografiaServicio {

    public parseJwsToken(jws: string): JwsToken {
        let jwtObj = KJUR.jws.JWS.parse(jws);
        let jwt = jwtObj && {
            header: jwtObj.headerObj,
            payload: jwtObj.payloadObj
        };

        return jwt;
    }

    public verifyJwsToken(token: string, jsk: Jsk): boolean {
        var cert = KEYUTIL.getKey(jsk);
        return KJUR.jws.JWS.verify(token, cert);
    }

    public hashWithSha256(s: string): string {
        return KJUR.crypto.Util.sha256(s);
    }

    public hextob64u(s: string): string {
        return hextob64u(s);
    }
}
