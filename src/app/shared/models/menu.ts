import { Item } from './interfaces/item';

export class Menu {
    private data: Item[];
    public groups: { [key: string]: Item[] } = {};

    constructor(data: Item[]) {
        if (data.length)
            data.forEach((item) => {
                if (!this.groups[item.tabId]) this.groups[item.tabId] = [];
                this.groups[item.tabId].push(item);
                item.items = data.filter((itm: any) => itm.parentId === item.id) || [];
            });

        this.data = data;
    }

    getItem(id: number): Item | undefined {
        return this.data.find((item) => item.id === Number(id));
    }

    getMainItems(tabId: number) {
        return this.data.filter((item: any) => item.tabId === tabId && item.parentId === 0);
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
