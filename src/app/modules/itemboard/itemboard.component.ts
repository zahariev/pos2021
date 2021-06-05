/* eslint-disable @typescript-eslint/no-unused-expressions */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '@app/core/services/menu.service';
import { OrderService } from '@app/core/services/order.service';

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
    itemSubList: any = {};
    state = 'default';
    selectedIdx = 0;
    filtered: any = {};

    constructor(private menuService: MenuService, private order: OrderService) {
        this.menuService.filter = false;
        this.menuService.menu.subscribe((menu: any) => {
            if (menu.items) {
                this.menu = menu.items;
            }
        });

        this.menuService.tabs.subscribe((tabs: any) => {
            if (tabs) {
                this.filtered = {};
                this.tabs = tabs;
            }
        });

        this.menuService.filtered.subscribe((data: any) => {
            if (this.menuService.filter) {
                this.filtered = data;
                this.selectedIdx = 0;
                this.tabs = [];
            } else {
                this.filtered = {};
            }
        });
    }

    ngOnInit(): void {
        const a = 0;
    }

    markItem(item: any) {
        this.order.addItem(item);
    }

    toggleOpenTables() {
        this.state === 'default' ? (this.state = 'open') : (this.state = 'default');
    }

    filterSubItems(item: any) {
        const items: any = [];

        if (this.menu.indexOf(item) > -1) this.itemSubList.name = item.name;
        else return;
        // id = "_" + id;  // to be delete after api change
        this.menu.forEach((menuItem: any) => {
            if ('_' + item.group_id === menuItem.group_id) {
                items.push(menuItem);
            }
        });

        if (!items.length) return;
        // console.log(this.subWindowItems);

        this.itemSubList.items = [...items];
    }

    cloaseItemList() {
        this.itemSubList = [];
    }
}
