/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Injector } from '@angular/core';
import { User } from '@shared/models/user';
import { AuthResponse } from '@app/auth/models/authresponse';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { UserPermissions } from '@app/auth/models/UserPermissions';
import { catchError, map, tap } from 'rxjs/operators';
import { PersistanceService } from '@app/shared/services/auth/persistance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from '@app/shared/services/auth/user.service';
import { JwtTokenService } from '@app/shared/services/auth/jwt-token.service';
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    redirectUrl = '';
    gettingRefreshToken = false;
    user!: Partial<User> | undefined;
    private refreshTokenTimeout!: any;
    //TODO: to connect with environment variable
    private apiUrl = environment.apiUrl + '/user-management';
    public isPassReset = new BehaviorSubject(false);
    constructor(
        private http: HttpClient,
        private localStore: PersistanceService,
        private router: Router,
        private jwtToken: JwtTokenService,
        private userService: UserService,
        private _snackBar: MatSnackBar,
    ) {}

    openSnackBar(message: string, action: string = 'X') {
        this._snackBar.open(message, action, {
            duration: 5000,
        });
    }

    public async login(user: Partial<User>): Promise<any> {
        return this.authApiCall('/login', user).then((authResp: AuthResponse) => {
            this.doLoginUser(authResp);

            // TODO: else redirect
        });
    }

    public logout() {
        this.doLogoutUser();
    }

    public isLoggedIn(): boolean {
        const token = this.jwtToken.getAccessToken() || undefined;
        if (!this.refreshTokenTimeout) this.startRefreshTokenTimer();

        return !!token?.length;
    }
    //TODO uncomment
    private doLoginUser(response: AuthResponse): void {
        // if (this.jwtToken.validatePayloadExpiration(response.access_token))
        // {
        this.jwtToken.storeTokens(response);
        const user = this.jwtToken.fetchUserData();

        this.userService.setActiveUserInfo(User.mapIncoming(user));
        this.startRefreshTokenTimer();
        // } else {
        //     this.openSnackBar('Token has expired !');
        // }
    }

    private doLogoutUser() {
        localStorage.clear();
        this.jwtToken.removeTokens();
        this.stopRefreshTokenTimer();
        this.userService.user$.next(null);

        this.router.navigate(['/login']);
    }

    // API Calls

    public refreshToken() {
        return this.http
            .post<any>(
                `${this.apiUrl}/token/refresh`,
                {
                    refreshToken: this.jwtToken.getRefreshToken(),
                },
                { headers },
            )
            .pipe(
                map((tokens) => {
                    this.jwtToken.storeTokens(tokens);

                    this.startRefreshTokenTimer();
                }),
                catchError((error) => {
                    this.doLogoutUser();
                    return of(false);
                }),
            );
    }

    private authApiCall(path: string, user: Partial<User>): Promise<AuthResponse> {
        const url = `${this.apiUrl}${path}`;
        return (
            this.http
                .get('assets/loginResp.json')
                //TODO uncomment
                // return (this.http
                //     .post(url, user)
                .toPromise()
                .then((response) => response as AuthResponse)
                .catch(this.handleError)
        );
    }

    private handleError(error: any): Promise<any> {
        console.log(error);

        this?.openSnackBar(error);
        return Promise.reject(error.message || error);
    }

    public changePasswordApiCall(userId: string) {
        return this.http
            .get(`${this.apiUrl}/user/${userId}/password/reset/`)
            .toPromise()
            .then((response) => {
                this.openSnackBar('An Email with a link for password reset was sent to you');
                return response as AuthResponse;
            })
            .catch((err) => {
                this.handleError(err);
            });
    }
    public resetPasswordApiCall(data: { email: string }) {
        return this.http.post(`${this.apiUrl}/password/reset`, data);
    }

    private startRefreshTokenTimer() {
        this.stopRefreshTokenTimer();
        // set a timeout to refresh the token a minute before it expires getAccessTokenExpirationTimestamp
        const expires = this.jwtToken.getAccessTokenExpirationTimestamp();
        const timeout = expires.getTime() - Date.now() - 60 * 1000;

        if (timeout > 10000)
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
        else if (this.jwtToken.notExpiredRefreshToken())
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), 2000);
        //TODO uncomment
        //else this.logout();
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
