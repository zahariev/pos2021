import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/shared/material.module';

import { HeaderComponent } from './header.component';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let button: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            declarations: [HeaderComponent, TranslatePipeMock],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the logo', () => {
        const elements = fixture.debugElement.nativeElement;
        expect(elements.querySelector('div.logo>img').src).toContain('Helvetic%20Logo.jpg');
    });

    it('should click() on menu icon', fakeAsync(() => {
        spyOn(component, 'toggleSidebar');
        const elements = fixture.debugElement.nativeElement;

        button = elements.querySelector('#sidebar-toggle').click();
        fixture.detectChanges();
        tick();
        flush();

        expect(component.toggleSidebar).toHaveBeenCalled();
    }));

    it('should click() on user icon', fakeAsync(() => {
        spyOn(component, 'menuClick');
        const elements = fixture.debugElement.nativeElement;

        elements.querySelector('#userMenu').click();
        fixture.detectChanges();
        tick();
        flush();
        expect(component.menuClick).toHaveBeenCalled();
    }));

    it('should click() on clear search icon', fakeAsync(() => {
        const elements = fixture.debugElement.nativeElement;
        elements.querySelector('input[type="search"]').value = 'test search';
        expect(elements.querySelector('input[type="search"]').value.length).toBe(11);
        button = elements.querySelector('.clear-icon-button');
        button.click();
        fixture.detectChanges();
        tick();
        flush();

        expect(elements.querySelector('input[type="search"]').value.length).toBe(0);
    }));
});
