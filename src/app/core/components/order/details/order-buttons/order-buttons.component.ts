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
        this.order.setQty(qty);
    }
}
