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
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
    menu!: Menu;
    tabs: any = [];
    tabData: any = [];
    tabsContent: any = [];
    itemSubList: any = {};
    state = 'default';
    selectedIdx = 0;
    filtered: any = {};
    filter = '';
    color!: string;
    editMode = true;

    constructor(
        private menuService: MenuService,
        private order: OrderService,
        public dialog: MatDialog,
    ) {
        // this.menuService.filter = 'false';
        this.menuService.menuData.subscribe((data: any) => {
            if (data) {
                this.menu = data;
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
            if (value.length > 2 && !this.checkCommand(value)) {
                this.filter = value;
                this.filtered = this.menu.searchFilter(value);

                this.selectedIdx = 0;
                this.tabs = [];
            } else {
                // console.log('no filter');

                this.filter = '';
                this.filtered = [];
                // this.tabs = this.tabData;
            }
        });
    }

    dropItem(event: any, groupId: number) {
        if (event.previousContainer.data === event.container.data) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            if (!event.container.data) {
                this.menu.groups[groupId] = [];
                event.container.data = [];
            }

            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );

            event.container.data[event.currentIndex].tabId = groupId;
            this.menuService.updateItemParent(event.container.data[event.currentIndex]);
        }

        this.menuService.itemTabOrderChange(event.container.data.map((el: any) => el.id));
    }

    ifRestItems(tabId: number): boolean {
        if (this.menu.rest) return Object.keys(this.menu.rest[tabId]).length > 0;
        else return false;
    }

    dropCategory(event: any) {
        if (event.previousContainer.data === event.container.data) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.menuService.tabOrderChange(event.container.data.map((el: any) => el.id));
        } else {
            console.log('move');

            transferArrayItem(
                event.previousContainer.data,
                event.container.data || [],
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    checkCommand(value: string): boolean {
        switch (value.substr(0, 3)) {
            case '///':
                console.log('sys');

                break;
            case '???':
                break;
            default:
                return false;
        }
        return true;
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

    onTyping(ev: Event) {
        const input = ev.target as HTMLElement;
        console.log(input.innerHTML);
    }

    addCategory(tabId: number) {
        this.menuService.addTab(tabId);
    }

    editCategoryName(event: any, tab: Tab) {
        if (event.key === 'Enter' || event.type === 'blur') {
            const target = event.target as HTMLElement;
            const value = target.innerHTML;

            if (value.length) {
                tab.name = value.trim();
                console.log(tab);

                this.menuService.editTab(tab);
            } else {
                this.menuService.deleteTab(tab.id);
            }
            target.blur();
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
            }
        } else {
        }
    }
}
