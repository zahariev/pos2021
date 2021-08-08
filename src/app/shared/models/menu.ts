import { Item } from './interfaces/item';

export class Menu {
    private data: Item[];
    constructor(data: Item[]) {
        if (data.length)
            data.forEach((item) => {
                if (item.parentId)
                    item.items = data.filter((itm: any) => itm.parentId === item.id) || [];
                else item.items = [];
            });
        console.log(data);

        this.data = data;
    }

    getItem(id: number): Item | undefined {
        return this.data.find((item) => item.id === Number(id));
    }

    searchFilter(str: string): Item[] | undefined {
        return this.data.filter(
            (item) => item.name.toLowerCase().includes(str) || item.sku.toLowerCase().includes(str),
        );
    }

    getCategories(parentId: number) {
        return this.data.filter((item: any) => !item.parentId && item.categoryId === parentId);
    }

    getItems(parentId: number) {
        return this.data?.filter((item: any) => item.parentId === parentId);
    }
}
