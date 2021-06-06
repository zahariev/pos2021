/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/core/services/order.service';

@Component({
    selector: 'openbill-details',
    templateUrl: './openbill-details.component.html',
    styleUrls: ['./openbill-details.component.scss'],
})
export class OpenbillDetailsComponent implements OnInit {
    openTab: any;
    constructor(public order: OrderService) {}

    ngOnInit(): void {
        const a = 0;
    }

    tabTotalClick() {}

    itemListClick(item: any) {
        this.order.addItem(item);
    }
}
