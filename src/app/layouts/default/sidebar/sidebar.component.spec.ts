/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '@app/shared/material.module';

export interface MenuNode {
    name: string;
    link: string;
    level: number;
    id: string;
    children?: MenuNode[];
    hasContent: boolean;
}

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    const menu1 = { DASHBOARD: 'Dashboard' };

    const menu2 = {
        SETTINGS: 'Settings',
    };

    const menu3 = {
        FLEETS: {
            TITLE: 'Fleets',
            IN_PREPARATION: 'In Preparation',
            IN_FLEETED: 'In-Fleeted',
            DE_FLEETED: 'De-Fleeted',
        },
    };

    const result2 = [
        {
            name: 'Settings',
            children: [],
            link: 'settings',
            id: 'settings',
        },
    ];

    const result3 = [
        {
            name: 'Fleets',
            children: [
                {
                    name: 'In Preparation',
                    children: [],
                    link: 'fleets/in-preparation',
                    id: 'in-preparation',
                },
                {
                    name: 'In-Fleeted',
                    children: [],
                    link: 'fleets/in-fleeted',
                    id: 'in-fleeted',
                },
                {
                    name: 'De-Fleeted',
                    children: [],
                    link: 'fleets/de-fleeted',
                    id: 'de-fleeted',
                },
            ],
            link: '',
            id: 'Fleets',
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [HttpClientTestingModule, MaterialModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('call convertToMenuTree()', () => {
        // it('should create flat item', () => {
        //     expect(component.convertToMenuTree(menu2)).toEqual(result2);
        // });
        // it('should create item with children array', () => {
        //     expect(component.convertToMenuTree(menu3)).toEqual(result3);
        // });
    });
});
