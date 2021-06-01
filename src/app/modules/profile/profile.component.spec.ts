import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { HistoryService } from '@app/shared/services/history.service';

import { ProfileComponent } from './profile.component';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    const historySpy = jasmine.createSpyObj('HistoryService', ['navigateByUrl']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileComponent, TranslatePipeMock],
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatSelectModule,
                MatOptionModule,
                MatInputModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatMenuModule,
                OverlayModule,
            ],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: HistoryService, useValue: historySpy },
                MatSnackBar,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe(' userForm ', () => {
        describe('сhould render ', () => {
            let elements: any;
            beforeEach(fakeAsync(() => {
                elements = fixture.nativeElement;
                expect(component.passwordChange).toBeFalse();
                fixture.detectChanges();
            }));

            it('#firstName input element', fakeAsync(() => {
                expect(elements.querySelector('#firstName')).toBeTruthy();
            }));
            it('#lastName input element', fakeAsync(() => {
                expect(elements.querySelector('#lastName')).toBeTruthy();
            }));
            it('#email input element', fakeAsync(() => {
                expect(elements.querySelector('#email')).toBeTruthy();
            }));

            it('#position input element', fakeAsync(() => {
                expect(elements.querySelector('#position')).toBeTruthy();
            }));

            it('#changePasswordBtn element', fakeAsync(() => {
                expect(elements.querySelector('#changePasswordBtn')).toBeTruthy();
            }));
        });
    });

    describe('Change Password Request', () => {
        it('#changePasswordBtn should send request for password change');
    });
});
