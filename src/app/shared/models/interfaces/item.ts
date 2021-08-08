/* eslint-disable @typescript-eslint/naming-convention */
export interface Item {
    id: number;
    parentId: number;
    categoryId: number;
    recipeId: number;
    name: string;
    price: number;
    costPrice: number;
    saleQty: number;
    round: number;
    level: number;
    idx: number;
    sku: string;
    active: boolean;
    items: Item[];
}
