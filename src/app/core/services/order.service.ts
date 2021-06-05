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
    showHistory = false;
    sumTotal: any;
    timer: any;
    orderTimer: any;
    temp: any = {};
    state: any;

    constructor(public userService: UserService, private menuService: MenuService) {
        let local = localStorage.getItem('sales') as string;
        if (local) {
            local = JSON.parse(local) as any;
            this.sales = local;
        } else this.sales = [];

        this.menuService.menu.subscribe((menu: any) => {
            if (menu.tables) {
                this.tables = menu.tables;
            }
        });
        this.setState();

        this.timer = setTimeout(() => {
            this.showHistory = true;
        }, 1 * 60 * 1000);
    }

    addItem(item: any, qty: any = this.qty) {
        this.state = '';
        this.temp = {};
        this.showHistory = false;
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
        this.sumTotal = this.getSumTotal();
        this.setState();
        localStorage.setItem('order', JSON.stringify(this.getOrderProperties()));
    }

    voidLastItem() {
        this.items = [...this.history.pop().items];
        this.items = [...this.items];
        if (!this.items.length) {
            // this.clearOrder(1)
            this.state = 'Нова Поръчка';
            this.sumTotal = 0;
            this.setState();
        }
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
        this.state = 'Поръчка Приета';

        const temp = {
            user: this.userService.user,
            items: this.items,
            table: {},
            closed: true,
            time: Date.now(),
            total: this.sumTotal,
            state: this.state,
        };
        this.sales.push(temp);
        this.temp = temp;
        this.items = [];
        this.sumTotal = 0;
        this.state = '';

        localStorage.setItem('sales', JSON.stringify(this.sales));

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (!this.items.length) this.showHistory = true;
        }, 1 * 60 * 1000);

        clearTimeout(this.orderTimer);
        this.orderTimer = setTimeout(() => {
            this.temp = [];
        }, 6 * 1000);
    }

    public setState() {
        if (this.table.id) this.state = ' + клиент на маса';
        else this.state = 'Нова Поръчка';
        if (this.items.length) this.state = '';

        // const openTab = this.openTabs.get(this.table.id);

        // if (openTab) this.openTab = openTab;
        // else this.openTab = new OpenTab();

        // this.store('order', {
        //     items: this.items,
        //     table: this.table,
        //     lastOrders: this.lastOrders,
        // });
    }

    getOrderProperties() {
        return {
            items: this.items,
            user: this.user,
        };
    }

    getSumTotal() {
        return this.items.reduce(
            (sum: number, current: any) => sum + current.qty * current.price,
            0,
        );
    }

    getLocal(name: string) {
        let local = localStorage.getItem(name) as string;
        if (local) {
            local = JSON.parse(name) as any;
            // this[name as any] = local;
        }
    }
}
