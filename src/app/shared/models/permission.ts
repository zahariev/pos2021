export class Permission {
    constructor(
        public id: number,
        public label: string,
        public path: string,
        public active: boolean,
    ) {}

    static mapIncoming(json: any) {
        return new Permission(json.id, json.name, json.path, json.active);
    }
}
