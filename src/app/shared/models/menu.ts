import { Item } from './interfaces/item';

export class Menu {
    private data: Item[];
    constructor(data: Item[]) {
        if (data.length)
            data.forEach((item) => {
                item.items = data.filter((itm: any) => itm.parentId === item.id) || [];
            });
        console.log(data);

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
