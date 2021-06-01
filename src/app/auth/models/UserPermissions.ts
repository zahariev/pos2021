export class UserPermissions {
    email = '';
    enabled = false;
    firstName = '';
    id = '';
    lastName = '';
    permissions: Permissions[] = [];
    position = { id: 0, position: '' };
    username = '';
}

export class Permissions {
    active!: boolean;
    permission!: Permission;
}
export class Permission {
    id = 0;
    label = '';
    path = '';
    type = '';
}
