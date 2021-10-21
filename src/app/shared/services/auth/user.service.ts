/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { User } from '@shared/models/user';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, throwError } from 'rxjs';
import { PersistanceService } from './persistance.service';
import { JwtTokenService } from './jwt-token.service';
import { tap } from 'rxjs/operators';

const path = '/user-management';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public user$ = new BehaviorSubject<User | null>({} as User);
    public activeUser = this.user$.asObservable();
    public users$ = new BehaviorSubject<User[] | null>([]);
    public listUsers = this.users$.asObservable();

    editMode = false;
    user!: User;
    initData = false;

    constructor(public http: HttpService, private jwtToken: JwtTokenService) {
        if (!this.initData) {
            const tokenUser = this.jwtToken.fetchUserData() as User;
            this.initData = true;

            setTimeout(() => this.setActiveUserInfo(tokenUser));
        }
    }

    setActiveUserInfo(user: User): void {
        if (user?.firstName) {
            this.getUserInfo(user?.id).subscribe((userInfo) => {
                // TODO uncomment
                if (userInfo) {
                    // userInfo.permissions = userInfo?.permissions;
                    // userInfo.position = userInfo?.position?.position;
                }

                this.initData = true;
                this.user$.next(userInfo);
                this.user = userInfo;
            });
        }
    }

    filterTree(data: any): any {
        const res: any = [];

        data.forEach((element: any) => {
            if (!element.children?.length) {
                if (this.hasClaim(element.path)) res.push(element);
            } else {
                const children = this.filterTree(element.children);

                element.children = children;
                if (children.length && this.hasClaim(element.path)) {
                    res.push(element);
                }
            }
        });
        return res;
    }

    hasClaim(claimType: any, claimValue?: any) {
        const user = this.user$.getValue();

        if (user?.permissions && user?.permissions.filter((p: any) => p.path === claimType).length)
            return true;
        return false;
    }

    logout() {
        this.user$.next(null);
    }

    getUsers(): Observable<any> {
        return this.http.getApiCall(path + '/user/').pipe(
            tap((usrs) => {
                this.users$.next(usrs);
            }),
        );
    }

    getListPositions(): Observable<any> {
        return this.http.getApiCall(path + '/admin/position/');
    }

    updateUser(id: string, data: any): Observable<any> {
        return this.http.putApiCall(path + `/user/${id}`, data);
    }

    addUser(data: any): Observable<any> {
        return this.http.postApiCall(path + `/user`, data);
        // return this.postApiCall(`user`, data);
    }

    userToggleEnable(id: string, data: { enable: boolean }) {
        return this.http.postApiCall(path + `/user/${id}/enable`, data);
    }

    private getUserInfo(userId: string | undefined): Observable<any> {
        return this.http.get('./assets/userInfo.json');
        //return this.http.getApiCall(path + `/user/${userId}`);
    }
}
