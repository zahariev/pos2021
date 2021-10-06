import { Item } from './interfaces/item';
import { Tab } from './interfaces/tab';

export class Menu {
    private data: Item[];
    public groups: { [key: string]: Item[] } = {};
    public rest: { [key: string]: Item[] } = {};

    constructor(data: Item[], categories: Tab[]) {
        if (data.length)
            categories.forEach((category) => {
                this.rest[category.id] = data.filter(
                    (itm: any) => itm.tabId === category.id && itm.parentId === 0,
                );
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
