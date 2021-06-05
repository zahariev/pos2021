/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/core/services/order.service';

import { Pipe, PipeTransform } from '@angular/core';

@Component({
    selector: 'history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    history: any[];

    constructor(public order: OrderService) {
        this.history = order.sales;
    }

    ngOnInit(): void {
        const a = 0;
    }

    checkTimeDiff(timeStamp: number) {
        return (Date.now() - timeStamp) / 1000 / 60;
    }

    toggleShowHistory() {
        this.order.showHistory = !this.order.showHistory;
    }
}
