import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/core/services/order.service';

@Component({
    selector: 'app-order-buttons',
    templateUrl: './order-buttons.component.html',
    styleUrls: ['./order-buttons.component.css'],
})
export class OrderButtonsComponent implements OnInit {
    constructor(public order: OrderService) {
        this.order = order;
    }

    ngOnInit() {
        const a = 0;
    }

    public subTotal(e: any) {
        //this.printTickets();

        this.order.subTotal();
    }

    public getListItemsLength() {
        // console.log(this.parent.list);
        return this.order.items.length;
    }

    public voidItem() {
        this.order.voidLastItem();
    }

    public toggleQty(qty: any) {
        switch (this.order.qtyStr) {
            case '1':
                this.order.qtyStr = '1/2';
                this.order.qty = 0.5;
                break;
            case '1/2':
                this.order.qtyStr = '1/3';
                this.order.qty = 0.3;
                break;
            case '1/3':
                this.order.qtyStr = '1/4';
                this.order.qty = 0.25;
                break;
            case '1/4':
                this.order.qtyStr = '1';
                this.order.qty = 1;
                break;
        }
    }
}
