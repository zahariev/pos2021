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
                tabs.forEach((tab) => {
                    tab.parentId = Number(tab.parentId);
                    if (tab.parentId === 0) tab.items = [];
                });

                tabs.forEach((tab) => {
                    if (tab.parentId > 0) {
                        const el: Tab = tabs.filter((elem) => elem.id === tab.parentId)[0];
                        if (el) el.items?.push(tab);
                    }
                });
                this.$tabsSource.next(tabs.filter((tab) => tab.parentId === 0));
            },
        );
    }

    public addTab(parentId: number = 0) {
        this.http.postApiCall('/pos/tab', { parentId }).subscribe((res) => {
            this.getTabs();
            // console.log(tabs);
        });
    }

    public deleteTab(id: number = 0) {
        this.http.deleteApiCall(`/pos/tab/${id}`).subscribe((res) => {
            this.getTabs();
            // console.log(tabs);
        });
    }

    public editTab(tab: Tab) {
        this.http.putApiCall(`/pos/tab/${tab.id}`, { tab }).subscribe((res) => {
            this.getTabs();
            // console.log(tabs);
        });
    }

    public getMenuData(): void {
        this.http.get('/api/pos/menu').subscribe((data: Item[]) => {
            console.log(data);

            this.$menuSource.next(data);
            this.rawMenu = new Menu(data);
        });
    }

    public itemTabOrderChange(arrIds: number[]) {
        this.http.postApiCall(`/pos/itemTabIdxChange`, arrIds).subscribe((res) => {
            this.getTabs();
        });
    }

    public updateItemParent(tab: Tab) {
        this.http.putApiCall(`/pos/itemParentChange/${tab.id}`, { tab }).subscribe((res) => {
            this.getTabs();
            // console.log(tabs);
        });
    }

    public tabOrderChange(arrIds: number[]) {
        this.http.postApiCall(`/pos/tabIdxChange`, arrIds).subscribe((res) => {
            this.getTabs();
        });
    }

    filterMenu(value: string) {
        value = value.trim().toLowerCase();

        this.$filtered.next(value);
    }
}
