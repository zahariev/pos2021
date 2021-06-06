/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

import { OrderService } from '@app/core/services/order.service';

@Component({
    selector: 'order-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
    // @ViewChild (OrderListComponent) list: OrderListComponent;
    @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
    freeTables: any[] = [];
    order: any;
    constructor(order: OrderService) {
        this.order = order;
    }

    ngOnInit() {
        const a = 0;
    }

    markItem(event: any) {
        this.order.qty *= event.sign;
        this.order.addItem(event.item);
    }

    menuOpened() {
        this.freeTables = this.getFreeTables();
    }

    getFreeTables() {
        return [
            { name: 'Table', id: '0' },
            { name: 'Table 1', id: '1' },
            { name: 'Table 2', id: '2' },
            { name: 'Table 3', id: '3' },
            { name: 'Table 4', id: '4' },
        ].filter((item) => !this.order.openTabs.find((openT: any) => openT.table.id === item.id));
    }

    selectTable(table: any) {
        // console.log(id);
        this.order.setTable(table);
    }
}
