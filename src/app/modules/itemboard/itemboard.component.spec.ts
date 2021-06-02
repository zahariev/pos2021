import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemboardComponent } from './itemboard.component';

describe('ItemboardComponent', () => {
    let component: ItemboardComponent;
    let fixture: ComponentFixture<ItemboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemboardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
