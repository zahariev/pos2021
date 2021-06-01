import jwt_decode from 'jwt-decode';
import { User } from '@shared/models/user';
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { PersistanceService } from './persistance.service';

@Injectable({
    providedIn: 'root',
})
export class JwtTokenService {
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

    constructor(private localStore: PersistanceService) {}

    public getAccessToken(): string {
        return this.localStore.get(this.JWT_TOKEN) as string;
    }

    public isValid(): boolean {
        const token = this.getAccessToken();
        let data!: any;
        if (!token) return false;

        try {
            data = jwt_decode(token);

            const expires = new Date(data.exp * 1000);
            const moment = new Date();

            if (expires > moment) {
                return true;
            }
        } finally {
        }

        return false;
    }

    public notExpiredRefreshToken(): boolean {
        const token = this.getRefreshToken();
        const exp = this.getRefreshTokenExpirationTimestamp();

        const moment = new Date();

        if (exp > moment) return true;
        return false;
    }

    public getRefreshTokenExpirationTimestamp(): Date {
        const token = this.getRefreshToken();
        if (JSON.stringify(token) === '{}') return new Date(0);
        let data!: any;
        let expires;
        try {
            data = jwt_decode(token);
            expires = new Date(data.exp * 1000);
        } finally {
        }
        return expires;
    }

    public getAccessTokenExpirationTimestamp(): Date {
        const token = this.getAccessToken();
        if (JSON.stringify(token) === '{}') return new Date(0);
        let data!: any;
        let expires;
        try {
            data = jwt_decode(token);
            expires = new Date(data.exp * 1000);
        } finally {
        }
        return expires;
    }

    public getRefreshToken(): string {
        return this.localStore.get(this.REFRESH_TOKEN) as string;
    }

    public storeTokens(response: any): void {
        this.localStore.set(this.JWT_TOKEN, response.access_token);
        this.localStore.set(this.REFRESH_TOKEN, response.refresh_token);
    }

    public removeTokens() {
        this.localStore.remove(this.JWT_TOKEN);
        this.localStore.remove(this.REFRESH_TOKEN);
    }

    public fetchUserData(token: string | null = ''): Partial<User> | undefined {
        token = token || this.getAccessToken();
        let data!: any;
        if (token) {
            try {
                data = jwt_decode(token);
            } catch (err) {
                return undefined;
            }
            return new User(
                data.sub,
                1,
                data.email,
                true,
                data.given_name,
                data.family_name,
                data.email,
                '',
                '',
                [],
            );
        } else return undefined;
    }

    public validatePayloadExpiration(token: string) {
        const payload: any = jwt_decode(token);
        const now = Date.now().toString().slice(0, -3);

        if (payload.exp > now) {
            return true; //payload.exp > Date.now() / 1000;
        } else return false;
    }
}
