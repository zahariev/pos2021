/* eslint-disable @typescript-eslint/no-unused-expressions */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '@app/core/services/menu.service';

@Component({
    selector: 'app-itemboard',
    templateUrl: './itemboard.component.html',
    styleUrls: ['./itemboard.component.scss'],
    animations: [
        trigger('tabState', [
            state(
                'default',
                style({
                    transform: 'translateY(0)',
                }),
            ),
            state(
                'open',
                style({
                    bottom: 'initial',
                    top: '75vh',
                }),
            ),
            transition('default <=> open', animate(200)),
        ]),
    ],
})
export class ItemboardComponent implements OnInit {
    menu: any = [];
    tabs: any = [];
    state = 'default';

    constructor(private menuService: MenuService) {
        this.menuService.menu.subscribe((menu: any) => {
            if (menu?.items) this.menu = menu.items;
            console.log(this.menu);
        });

        this.menuService.tabs.subscribe((tabs: any) => {
            if (this.tabs) this.tabs = tabs;
            console.log(this.tabs);
        });
    }

    ngOnInit(): void {
        const a = 0;
    }
    toggleOpenTables() {
        this.state === 'default' ? (this.state = 'open') : (this.state = 'default');
    }
}
