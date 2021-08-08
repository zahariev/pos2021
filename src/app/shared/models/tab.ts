/* eslint-disable @typescript-eslint/naming-convention */
import { Item } from './interfaces/item';

export class Tab {
    constructor(
        id: number,
        code: string,
        indexId: number,
        leaf: boolean,
        title: string,
        visible: boolean,
        content: { name: string; items: Partial<Item>[] }[],
    ) {}
}
