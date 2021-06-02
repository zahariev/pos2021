import { Injectable } from '@angular/core';

import { HttpService } from '@shared/services/auth/http.service';
import { BehaviorSubject } from 'rxjs';

const tabsUrl =
    'https://api.bilkata.bg/ang5/itemsGet2/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111';

const menuUrl =
    'https://api.bilkata.bg/ang5/menuGet/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111';
@Injectable({
    providedIn: 'root',
})
export class MenuService {
    rawMenu: any;
    private $tabsSource = new BehaviorSubject(new Array());
    public tabs = this.$tabsSource.asObservable();

    private $menuSource = new BehaviorSubject(new Array());
    public menu = this.$menuSource.asObservable();

    private $filtered = new BehaviorSubject(new Array());
    public filtered = this.$filtered.asObservable();

    constructor(private http: HttpService) {
        this.getTabItems();
        this.getMenuData();
    }

    public getTabItems(): void {
        this.http.get(tabsUrl).subscribe((data) => {
            this.$tabsSource.next(data);
        });
    }

    private getMenuData(): void {
        this.http.get(menuUrl).subscribe((data) => {
            this.$menuSource.next(data);
            this.rawMenu = data;
        });
    }

    filterMenu(value: string) {
        value = value.trim().toLowerCase();
        const items: any = { ...this.rawMenu.items };

        const filtered: any = [];
        Object.values(items)?.forEach((item: any) => {
            if (item.name.toLowerCase().indexOf(value) > -1) {
                filtered.push(item);
            }
        });

        this.$filtered.next(filtered);
    }
}