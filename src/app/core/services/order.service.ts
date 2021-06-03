import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    items: any = [];
    user: any;
    qty = 1;
    qtyStr = '1';

    constructor() {
        // let local = localStorage.getItem('order') as string;
        // if (local) {
        //     local = JSON.parse(localStorage.getItem('order') as string) as any;
        //     this.items = local.items;
        //     this.user = local.user;
        // }
    }

    addItem(item: any, qty: any = this.qty) {
        const lastItem = this.items[this.items.length - 1];
        if (lastItem?.id === item.id) {
            lastItem.qty = lastItem.qty + qty;
        } else {
            item.qty = 0 + qty;
            this.items.push({ ...item });
        }
        localStorage.setItem('order', JSON.stringify(this.getOrderProperties()));
    }

    voidLastItem() {
        this.items.pop();
    }

    setQty(qty: any) {}
    subTotal() {}

    getOrderProperties() {
        return {
            items: this.items,
            user: this.user,
        };
    }

    get sumTotal() {
        return this.items.reduce(
            (sum: number, current: any) => sum + current.qty * current.price,
            0,
        );
    }
}
