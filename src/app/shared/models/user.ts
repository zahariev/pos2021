export class User {
    constructor(
        public id: '',
        public idx: number,
        public email: '',
        public enabled: boolean,
        public firstName: '',
        public lastName: '',
        public username: '',
        public password: '',
        public position: '',
        public permissions: [],
    ) {}

    static mapIncoming(json: any) {
        return new User(
            json.id,
            json.idx,
            json.email,
            json.enabled,
            json.firstName,
            json.lastName,
            json.email,
            json.password || '',
            json.position || '',
            json.permissions || [],
        );
    }
}
