/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { version } from '@app/../../package.json';

import { FooterComponent } from './footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

const translations: any = {
    COMMON: {
        TM: ' All Rights Reserved 2021',
    },
};

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDividerModule],
            declarations: [FooterComponent, TranslatePipeMock],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the trademark', () => {
        const elements = fixture.debugElement.nativeElement;
        expect(elements.querySelector('#tradeMark').textContent).toContain('COMMON.TM');
    });

    it('should render version no.', () => {
        const elements = fixture.debugElement.nativeElement;
        expect(elements.querySelector('span.version').textContent).toContain('v.' + version);
    });
});
