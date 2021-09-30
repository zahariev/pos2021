export interface Tab {
    id: number;
    parentId: number;
    name: string;
    idx: number;
    items?: Tab[];
}
