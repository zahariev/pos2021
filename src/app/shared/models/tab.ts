/* eslint-disable @typescript-eslint/naming-convention */
import { Item } from './item';

export class Tab {
    constructor(
        id: number,
        code: string,
        indexId: number,
        title: string,
        visible: boolean,
        content: { name: string; items: Partial<Item>[] }[],
    ) {}
}
