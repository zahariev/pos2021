import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { HistoryService } from '@app/shared/services/history.service';
import { UserService } from '@app/shared/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
    protected route!: string;
    constructor(
        private authService: AuthService,
        private router: Router,
        private userService: UserService,
        private historyService: HistoryService,
    ) {}
    canActivate(
        route2: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // this will be passed from the route config
        // on the data property
        const url: string = state.url;
        if (this.checkLogin(url)) {
            this.route = route2.data.permission as string;
            if (this.userService.hasClaim(this.route)) return true;
            else {
                const newRoute = this.historyService.getLastNonLoginUrl();
                if (this.userService.hasClaim(newRoute)) this.router.navigateByUrl(newRoute);
                else this.router.navigateByUrl('dashboard');
            }
        }
        return false;
    }

    checkLogin(url: string) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
