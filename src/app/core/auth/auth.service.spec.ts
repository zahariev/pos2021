import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AuthService', () => {
    let injector: TestBed;
    let httpTestingController: HttpTestingController;
    let authService: AuthService;
    let guard: AuthGuard;
    const routeMock: any = { snapshot: {} };
    const routeStateMock: any = { snapshot: {}, url: '/cookies' };
    const routerMock = { navigate: jasmine.createSpy('navigate') };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard, { provide: Router, useValue: routerMock }, MatSnackBar],
            imports: [HttpClientTestingModule, MatMenuModule, OverlayModule],
        });
        injector = getTestBed();
        httpTestingController = TestBed.inject(HttpTestingController);
        authService = injector.inject(AuthService);
        guard = injector.inject(AuthGuard);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should redirect an unauthenticated user to the login route', () => {
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should allow the authenticated user to access app', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    });
});
