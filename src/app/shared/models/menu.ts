import { Item } from './interfaces/item';

export class Menu {
    private data: Item[];
    public groups: { [key: string]: Item[] } = {};
    public rest: { [key: string]: Item[] } = {};

    constructor(data: Item[]) {
        if (data.length)
            data.forEach((item) => {
                if (!this.groups[item.tabId]) this.groups[item.tabId] = [];
                if (!this.rest[item.tabId])
                    this.rest[item.tabId] = data.filter(
                        (itm: any) => itm.tabId === item.tabId && item.parentId === 0,
                    );
                item.items = data.filter((itm: any) => itm.parentId === item.id) || [];

                if (item.parentId === 0) this.groups[item.tabId].push(item);
            });

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
