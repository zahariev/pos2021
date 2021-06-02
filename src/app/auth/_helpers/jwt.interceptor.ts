/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AuthService } from '@app/core/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { JwtTokenService } from '@app/shared/services/auth/jwt-token.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    timer: any;
    timerHide: any;
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private spinner: NgxSpinnerService,
        private jwtToken: JwtTokenService,
    ) {
        this.spinnerHide();
    }

    private addToken(request: HttpRequest<any>, token: string | null) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.user;
        const token = this.jwtToken.getAccessToken();

        const isApiUrl = request.url.startsWith(environment.apiUrl);
        // TODO uncomment
        // if (this.authService.isLoggedIn() && isApiUrl && this.jwtToken.isValid()) {
        //     request = this.addToken(request, token);
        //     if (!request.url.endsWith('/token/refresh')) this.spinnerShow();
        // }

        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    this.spinnerHide();
                }
            }),
            catchError((err: any) => {
                let error = '';
                this.spinnerHide();
                console.log(err);
                if ([200].includes(err.status) && this.authService.isLoggedIn()) {
                    return next.handle(request);
                } else if ([400].includes(err.status) && this.authService.isLoggedIn()) {
                    if (err.error?.code > 1000) {
                        error = err.error?.message || err.statusText;

                        this.openSnackBar('Server Error: ' + error, 'Close');
                    } else this.authService.logout();
                } else if ([401, 403].includes(err.status) && this.authService.isLoggedIn()) {
                    this.openSnackBar('expired Token. Proceed to login ...', '');
                    this.authService.logout();
                    return next.handle(request);
                } else {
                    error = err.error?.errors
                        ? err.error.errors[0]?.message || err.statusText
                        : err.statusText;

                    this.openSnackBar('Server Error: ' + error, 'Close');
                }
                this.spinnerHide();
                return throwError(error);
            }),
        );
    }

    spinnerShow() {
        clearTimeout(this.timerHide);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.spinner.show();
            this.timerHide = setTimeout(() => {
                this.spinner.hide();
            }, 10000);
        }, 400);
    }

    spinnerHide() {
        clearTimeout(this.timer);

        this.spinner.hide();
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 5000,
        });
    }

    refreshToken() {
        //TODO: fallback if autorefresh token has not succeed
    }
}
