import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { OrderService } from '@app/core/services/order.service';

@Component({
    selector: 'app-order-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
    // @ViewChild (OrderListComponent) list: OrderListComponent;
    order: any;
    constructor(order: OrderService) {
        this.order = order;
        console.log(order);
    }

    ngOnInit() {
        const a = 0;
    }

    markItem(event: any) {
        this.order.qty *= event.sign;
        this.order.addItem(event.item);
    }
}
