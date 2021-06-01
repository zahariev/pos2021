import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';

describe('AuthGuardService', () => {
    const createMockRoute = (id: string) => {
        return {
            params: { id },
        } as any;
    };

    const createMockRouteState = (): RouterStateSnapshot => {
        return { url: '/dashboard/user-profile', root: new ActivatedRouteSnapshot() };
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard, MatSnackBar],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserDynamicTestingModule,
                MatMenuModule,
                OverlayModule,
            ],
        });
    });

    const route = createMockRoute('/dashboard');
    const state = createMockRouteState();
    it(
        'checks if a user is valid',
        waitForAsync(
            // inject your guard service AND Router
            inject([AuthGuard, Router], (auth: any, router: any) => {
                // add a spy
                spyOn(router, 'navigate');

                expect(auth.canActivate(route, state)).toBeFalsy();
                expect(router.navigate).toHaveBeenCalled();
            }),
        ),
    );
});
