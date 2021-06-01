import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ResetPasswordComponent } from './reset-password.component';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

describe('ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResetPasswordComponent, TranslatePipeMock],
            imports: [ReactiveFormsModule, HttpClientTestingModule, MatMenuModule, OverlayModule],

            providers: [{ provide: Router, useValue: routerSpy }, MatSnackBar],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have username and email inputs', () => {
        const element = fixture.nativeElement;

        expect(element.querySelector('form')).toBeTruthy();
        expect(element.querySelector('button')).toBeTruthy();
        expect(element.querySelector('#email')).toBeTruthy();
    });

    it(' should return model invalid when form is empty', () => {
        const element = fixture.nativeElement;

        expect(component.resetForm.valid).toBeFalsy();
    });

    it('should validate email input as required', () => {
        const email = component.resetForm.controls.email;

        expect(email.valid).toBeFalsy();
        expect(email.errors?.required).toBeTruthy();
    });

    it('should invalidate non email format', () => {
        const email = component.resetForm.controls.email;
        email.setValue('test');
        const errors = email.errors;

        expect(errors?.required).toBeFalsy();
        expect(errors?.pattern).toBeTruthy();
        expect(email.valid).toBeFalsy();
    });

    it('should validate email format correctly', () => {
        const email = component.resetForm.controls.email;
        email.setValue('test@test.com');
        const errors = email.errors || {};

        expect(errors.required).toBeFalsy();
        expect(errors.pattern).toBeFalsy();
        expect(email.valid).toBeTruthy();
    });

    it('should be disabled Submit button when form has error', fakeAsync(() => {
        spyOn(component, 'onSubmit');
        const elements = fixture.debugElement.nativeElement;

        const button = elements.querySelector('button');

        expect(button.disabled).toBeTruthy();
    }));

    it('should validate form valid whe email is valid', fakeAsync(() => {
        const email = component.resetForm.controls.email;
        email.setValue('test@test.com');

        const elements = fixture.debugElement.nativeElement;

        expect(component.resetForm.valid).toBeTruthy();
    }));

    it('should call Submit method when button is clicked', fakeAsync(() => {
        spyOn(component, 'onSubmit');
        const elements = fixture.debugElement.nativeElement;

        const button = elements.querySelector('button');
        button.disabled = false;
        button?.click();
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
                'COMMON.VALIDATORS.REQUIRED',
            );
        }));
    });
});
