import { Item } from './interfaces/item';
import { Tab } from './interfaces/tab';

export class Menu {
    private data: Item[];
    public groups: { [key: string]: Item[] } = {};
    public rest: { [key: string]: Item[] } = {};

    constructor(data: Item[], tabs: Tab[]) {
        if (data.length) {
            tabs.forEach((tab) => {
                console.log(tab.id);

                this.rest[tab.id] = data.filter(
                    (itm: any) => itm.tabId === tab.id && itm.parentId === 0,
                );
            });

            data.forEach((item) => {
                if (!this.groups[item.tabId]) this.groups[item.tabId] = [];

                item.items = data.filter((itm: any) => itm.parentId === item.id) || [];

                if (item.parentId === 0) this.groups[item.tabId].push(item);
                this.groups[item.tabId].sort((a: any, b: any) => a.idx - b.idx);
            });
        }
        console.log(this.groups);
        console.log(this.rest);

        this.data = data;
    }

    getItem(id: number): Item | undefined {
        return this.data.find((item) => item.id === Number(id));
    }

    searchFilter(str: string): Item[] | undefined {
        return this.data.filter(
            (item) =>
                item.name.toLowerCase().includes(str) ||
                item.sku.toLowerCase().includes(str) ||
                this.getItem(item.parentId)?.name.toLowerCase().includes(str),
        );
    }

    getItems(parentId: number) {
        return this.data?.filter((item: any) => item.parentId === parentId);
    }
}
