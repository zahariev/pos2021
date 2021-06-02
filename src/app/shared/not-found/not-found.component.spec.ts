import { MatCardModule } from '@angular/material/card';

import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { NotFoundComponent } from './not-found.component';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

@Component({ template: '' })
class DummyComponent {}

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;
    let location: Location;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                RouterTestingModule.withRoutes([{ path: 'itemboard', component: DummyComponent }]),
            ],
            declarations: [NotFoundComponent, TranslatePipeMock],
        }).compileComponents();

        location = TestBed.get(Location);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render h1 tag', () => {
        const elements = fixture.debugElement.nativeElement;
        expect(elements.querySelector('h1').textContent).toContain('COMMON.NOT_FOUND');
    });

    it('should render button', () => {
        const elements = fixture.debugElement.nativeElement;
        expect(elements.querySelector('button')).toBeTruthy();
    });

    it('should redirect to itemboard on "Return" button click()', fakeAsync(() => {
        const elements = fixture.debugElement.nativeElement;

        const button = elements.querySelector('button');
        button.click();
        tick();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(location.path()).toBe('/itemboard');
        });
    }));
});
