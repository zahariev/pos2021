import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenbillDetailsComponent } from './openbill-details.component';

describe('OpenbillDetailsComponent', () => {
    let component: OpenbillDetailsComponent;
    let fixture: ComponentFixture<OpenbillDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpenbillDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpenbillDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
