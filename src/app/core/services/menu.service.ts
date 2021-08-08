import { Injectable } from '@angular/core';
import { Tab } from '@app/shared/models/interfaces/tab';
import { Item } from '@app/shared/models/interfaces/item';
import { HttpService } from '@shared/services/auth/http.service';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '@app/shared/models/menu';

const tabsUrl =
    'https://api.bilkata.bg/ang5/itemsGet2/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111';

const menuUrl =
    'https://api.bilkata.bg/ang5/menuGet/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111';
@Injectable({
    providedIn: 'root',
})
export class MenuService {
    rawMenu: any;
    filter = '';
    private $tabsSource = new BehaviorSubject<Tab[]>(new Array());
    public tabs = this.$tabsSource.asObservable();

    private $menuSource = new BehaviorSubject<Item[]>(new Array());
    public menuData = this.$menuSource.asObservable();

    private $filtered = new BehaviorSubject('');
    public filtered = this.$filtered.asObservable();

    constructor(private http: HttpService) {
        this.getTabs();
        this.getMenuData();
    }

    public getTabs() {
        this.http.get('/api/pos/tabs').subscribe(
            async (tabs: Tab[]): Promise<void> => {
                // console.log(tabs);
                this.$tabsSource.next(tabs);
            },
        );
    }

    public getMenuData(): void {
        this.http.get('/api/pos/menuItems').subscribe((data: Item[]) => {
            this.$menuSource.next(data);
            this.rawMenu = new Menu(data);
        });
    }

    filterMenu(value: string) {
        value = value.trim().toLowerCase();

        this.$filtered.next(value);
    }
}
