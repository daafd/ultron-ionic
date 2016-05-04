// app/services/auth/auth.ts

import {tokenNotExpired} from 'angular2-jwt';

export class AuthService {
    constructor() {}

    public static authenticated() {
        return tokenNotExpired();
    }
}