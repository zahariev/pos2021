/* eslint-disable @typescript-eslint/no-unused-expressions */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '@app/core/services/menu.service';
import { OrderService } from '@app/core/services/order.service';
import { Tab } from '@app/shared/models/Tab';

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
        this.menuService.menu.subscribe((data: any) => {
            console.log(data);

            if (data.items) {
                this.menu = data.items;
            }
        });

        this.menuService.tabs.subscribe((tabs: Tab[]) => {
            console.log(tabs);

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
        if (item.id[0] !== '-') item = { ...this.menu['-' + item.id] };
        this.order.addItem({ ...item });
    }

    toggleOpenTables() {
        this.state === 'default' ? (this.state = 'open') : (this.state = 'default');
    }

    onContextMenu(event: Event) {
        let target: any = event.target;
        if (!target?.dataset?.id) target = target.parentElement;

        //var value = target.attributes[2].nodeValue;
        const value = target.dataset.id ? target.dataset.id : 0;

        //  Open Window for subItems
        this.filterSubItems(event, value);
        // if(value) this.order.addItemById(value,1);
        // else this.order.addItemById()
        event.stopPropagation();
        event.preventDefault();
    }

    filterSubItems(ev: Event, id: any) {
        const items: any = [];

        const item = this.menu[id] || this.menu['-' + id];

        if (item) this.itemSubList.name = item.name;
        else return;

        Object.keys(this.menu).forEach((key: any) => {
            if ('_' + id === this.menu[key].group_id) {
                items.push(this.menu[key]);
            }
        });

        if (!items.length) return;

        this.itemSubList.items = [...items];
        ev.stopPropagation();
        return false;
    }

    closeItemList() {
        this.itemSubList = [];
    }
}
