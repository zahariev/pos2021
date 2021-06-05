/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

import { OrderService } from '@app/core/services/order.service';

@Component({
    selector: 'order-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
    // @ViewChild (OrderListComponent) list: OrderListComponent;
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
}
