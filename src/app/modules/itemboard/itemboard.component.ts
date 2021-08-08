/* eslint-disable @typescript-eslint/no-unused-expressions */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '@app/core/services/menu.service';
import { OrderService } from '@app/core/services/order.service';
import { Item } from '@app/shared/models/interfaces/item';
import { Menu } from '@app/shared/models/menu';
import { Tab } from '@app/shared/models/interfaces/tab';
import { MatDialog } from '@angular/material/dialog';
import { SubItemListComponent } from './sub-item-list/sub-item-list.component';
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
    menu: Menu = new Menu([]);
    tabs: any = [];
    tabData: any = [];
    tabsContent: any = [];
    itemSubList: any = {};
    state = 'default';
    selectedIdx = 0;
    filtered: any = {};

    constructor(
        private menuService: MenuService,
        private order: OrderService,
        public dialog: MatDialog,
    ) {
        // this.menuService.filter = false;
        this.menuService.menuData.subscribe((data: any) => {
            console.log(data);

            if (data.length) {
                this.menu = new Menu(data);
            }
        });

        this.menuService.tabs.subscribe((tabs: Tab[]) => {
            if (tabs) {
                this.filtered = {};
                this.tabs = tabs;
                this.tabData = tabs;
            }
        });

        this.menuService.filtered.subscribe((value: any) => {
            if (value.length) {
                this.filtered = this.menu.searchFilter(value);

                this.selectedIdx = 0;
                this.tabs = [];
            } else {
                this.filtered = [];
                // this.tabs = this.tabData;
            }
        });
    }

    ngOnInit(): void {
        const a = 0;
    }

    markItem(item: any) {
        this.order.addItem({ ...item });
    }

    toggleOpenTables() {
        this.state === 'default' ? (this.state = 'open') : (this.state = 'default');
    }

    onContextMenu(event: Event) {
        let target: any = event.target;
        if (!target?.dataset?.id) target = target.parentElement;

        const value = target.dataset.id;

        //  Open Window for subItems
        this.filterSubItems(event, value);

        event.stopPropagation();
        event.preventDefault();
    }

    filterSubItems(ev: Event, id: any) {
        const items: any = [];

        const item = this.menu.getItem(id);

        if (item) this.itemSubList.name = item.name;
        else return;

        if (!item.items.length) return;

        this.itemSubList.items = [...item.items];
        const dialogRef = this.dialog.open(SubItemListComponent, {
            data: this.itemSubList,
        });
        const subscribeDialog = dialogRef.componentInstance.clickItemEvent.subscribe(
            (itm: Item) => {
                this.markItem(itm);
                //i can see 'hello' from MatDialog
            },
        );
        dialogRef.afterClosed().subscribe((result) => {
            subscribeDialog.unsubscribe();
        });
        ev.stopPropagation();
        return false;
    }

    closeItemList() {
        this.itemSubList = [];
    }
}
