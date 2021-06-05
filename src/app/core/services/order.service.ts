import { Injectable } from '@angular/core';
import { UserService } from '@app/shared/services/auth/user.service';
import { last } from 'rxjs/operators';
import { MenuService } from './menu.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    items: any = [];
    user: any;
    qty = 1;
    qtyStr = '1';
    history: any[] = [];
    sales: any = [];
    table: any = {};
    tables: any = {};

    constructor(public userService: UserService, private menuService: MenuService) {
        // let local = localStorage.getItem('order') as string;
        // if (local) {
        //     local = JSON.parse(localStorage.getItem('order') as string) as any;
        //     this.items = local.items;
        //     this.user = local.user;
        // }

        this.menuService.menu.subscribe((menu: any) => {
            if (menu.tables) {
                this.tables = menu.tables;
            }
        });
    }

    addItem(item: any, qty: any = this.qty) {
        this.history.push(JSON.parse(JSON.stringify({ items: this.items })));
        const lastItem = this.items[this.items.length - 1];
        // in mark
        if (this.items.indexOf(item) > -1) {
            item.qty += qty;
            if (item.qty <= 0) this.items.splice(this.items.indexOf(item), 1);
        } else if (lastItem?.id === item.id) {
            // last mark
            lastItem.qty = lastItem.qty + qty;
            if (item.qty <= 0) this.items.pop();
        } else {
            // no mark
            item.qty = qty;
            if (item.qty > 0) this.items.push({ ...item });
        }

        this.qty = 1;
        this.qtyStr = '1';

        localStorage.setItem('order', JSON.stringify(this.getOrderProperties()));
    }

    voidLastItem() {
        this.items = [...this.history.pop().items];
        this.items = [...this.items];
    }

    setQty(qty: any) {
        switch (this.qtyStr) {
            case '1':
                this.qtyStr = '1/2';
                this.qty = 0.5;
                break;
            case '1/2':
                this.qtyStr = '1/3';
                this.qty = 0.3;
                break;
            case '1/3':
                this.qtyStr = '1/4';
                this.qty = 0.25;
                break;
            case '1/4':
                this.qtyStr = '1';
                this.qty = 1;
                break;
        }
    }

    subTotal() {
        console.log('subTotal');
        this.sales.push({
            user: this.userService.user,
            items: this.items,
            table: {},
            closed: true,
            time: Date.now(),
        });
        this.items = [];
        console.log(this.sales);
    }

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
