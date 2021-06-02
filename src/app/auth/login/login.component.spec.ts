/* eslint-disable @typescript-eslint/naming-convention */
import { HistoryService } from '../../shared/services/auth/history.service';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

const translations: any = {
    COMMON: {
        VALIDATORS: {
            REQUIRED_PASSWORD: 'Password is required',
            REQUIRED_EMAIL: 'This field is mandatory.',
        },
    },
};

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    const historySpy = jasmine.createSpyObj('HistoryService', ['navigateByUrl']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('authService', [
        'login',
        'logout',
    ]);
    let button: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent, TranslatePipeMock],
            imports: [ReactiveFormsModule],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceStub,
                },
                { provide: Router, useValue: routerSpy },
                { provide: HistoryService, useValue: historySpy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have email and password inputs', () => {
        const element = fixture.nativeElement;

        expect(element.querySelector('form')).toBeTruthy();
        expect(element.querySelector('button')).toBeTruthy();
        expect(element.querySelector('#email')).toBeTruthy();
        expect(element.querySelector('#password')).toBeTruthy();
    });

    it(' shoule return model invalid when form is empty', () => {
        const element = fixture.nativeElement;

        expect(component.loginForm.valid).toBeFalsy();
    });

    it('should validate password input as required', () => {
        const password = component.loginForm.controls.password;

        expect(password.valid).toBeFalsy();
        expect(password.errors?.required).toBeTruthy();
    });

    it('should call Submit method', fakeAsync(() => {
        spyOn(component, 'onSubmit');
        const elements = fixture.debugElement.nativeElement;

        button = elements.querySelector('button')?.click();
        tick();
        expect(component.onSubmit).toHaveBeenCalledTimes(1);
    }));

    describe('should render validation message when', () => {
        it(' email control is empty', fakeAsync(() => {
            const elements = fixture.debugElement.nativeElement;

            elements.querySelector('button')?.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(elements.querySelector('#emailRequiredErr')).toBeTruthy();
            expect(elements?.querySelector('#emailRequiredErr')?.textContent).toContain(
                'COMMON.VALIDATORS.REQUIRED_EMAIL',
            );
        }));
        it(' password control is empty', fakeAsync(() => {
            const elements = fixture.debugElement.nativeElement;

            elements.querySelector('button')?.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(elements.querySelector('#passwordRequiredErr')).toBeTruthy();
            expect(elements?.querySelector('#passwordRequiredErr')?.textContent).toContain(
                'COMMON.VALIDATORS.REQUIRED_PASSWORD',
            );
        }));
    });
});
