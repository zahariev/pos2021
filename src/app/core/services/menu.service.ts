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

    private $menuSource = new BehaviorSubject<any>({});
    public menuData = this.$menuSource.asObservable();

    private $filtered = new BehaviorSubject('');
    public filtered = this.$filtered.asObservable();

    constructor(private http: HttpService) {
        this.getTabs();
    }

    public getTabs() {
        this.http.get('/api/pos/tabs').subscribe(
            async (tabs: Tab[]): Promise<void> => {
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
                const mainTabs = tabs.filter((tab) => tab.parentId === 0);
                this.$tabsSource.next(mainTabs);
                const categories = tabs.filter((tab) => tab.parentId > 0);
                this.getMenuData(categories);
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

    public getMenuData(tabs: Tab[]) {
        this.http.get('/api/pos/menu').subscribe((data: Item[]) => {
            this.$menuSource.next(new Menu(data, tabs));
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
