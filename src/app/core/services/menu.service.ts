import { Injectable } from '@angular/core';
import { Tab } from '@app/shared/models/Tab';
import { Item } from '@app/shared/models/item';
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
    filter = false;
    private $tabsSource = new BehaviorSubject<Tab[]>(new Array());
    public tabs = this.$tabsSource.asObservable();

    private $menuSource = new BehaviorSubject<Item[]>(new Array());
    public menu = this.$menuSource.asObservable();

    private $filtered = new BehaviorSubject(new Array());
    public filtered = this.$filtered.asObservable();

    constructor(private http: HttpService) {
        this.getTabItems();
        this.getMenuData();
    }

    public getTabItems(): void {
        this.http.get(tabsUrl).subscribe((data: Tab[]): void => {
            this.$tabsSource.next(data);
        });
    }

    private getMenuData(): void {
        this.http.get(menuUrl).subscribe((data: Item[]) => {
            this.$menuSource.next(data);
            this.rawMenu = data;
        });
    }

    filterMenu(value: string) {
        value = value.trim().toLowerCase();
        const items: Item[] = { ...this.rawMenu.items };

        const filtered: any = {};
        filtered.items = [];
        Object.values(items)?.forEach((item: any) => {
            if (item.name.toLowerCase().indexOf(value) > -1) {
                filtered.items.push(item);
            }
        });
        const tabs = this.$tabsSource.getValue();

        filtered.groups = [];
        Object.values(tabs)?.forEach((tab: any) => {
            tab.content.forEach((content: any) => {
                if (content.name.toLowerCase().indexOf(value) > -1) {
                    filtered.groups.push({ ...content });
                }
            });
        });
        this.$filtered.next(filtered);
    }
}
