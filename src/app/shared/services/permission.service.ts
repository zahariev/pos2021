import { Injectable } from '@angular/core';
import { User } from '@shared/models/user';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpService } from './http.service';

const path = '/user-management';

@Injectable({
    providedIn: 'root',
})
export class PermissionService {
    constructor(public http: HttpService) {}

    setUserPermission(userID: string, permission: number | number[]): Observable<any> {
        const data = !Array.isArray(permission) ? [permission] : permission;
        return this.http.postApiCall(path + `/user/${userID}/permission/`, data);
    }

    removeUserPermission(userID: string, permissionID: number): Observable<any> {
        const data = [permissionID];
        return this.http.deleteApiCall(path + `/user/${userID}/permission/${permissionID}`);
    }

    bulkRemovePermissions(userID: string, data: []): Observable<any> {
        const req: any[] = [];
        if (!data || data?.length === 0) return of(false);
        // populate array for forkJoin
        data.forEach((p: any) => {
            req.push(this.removeUserPermission(userID, p.permission?.id || p.id));
        });
        // this.openSnackBar('Erasing current permissions! ', 'close');
        return forkJoin(req);
    }

    addEditPermission(data: any) {
        return this.http.postApiCall(path + `/admin/permission-type/1/permission`, data);
    }
}
