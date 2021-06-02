import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HistoryService {
    private urls: string[] = ['/'];

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((routerEvent) => routerEvent instanceof NavigationEnd))
            .subscribe((routerEvent: any) => {
                const url = routerEvent.urlAfterRedirects;
                this.urls = [...this.urls, url];
            });
    }

    public getPreviousUrl(urls = this.urls, currentUrl: string = ''): string {
        const length = urls.length;

        if (length === 1 && urls[0] === currentUrl) return '/';
        else return length > 1 ? urls[length - 2] : urls[0];
    }

    public getLastNonLoginUrl(urls = this.urls): string {
        const exclude: string[] = ['/register', '/login', '/login/reset'];
        const filtered = urls.filter((url) => !exclude.includes(url));
        const length = filtered.length;
        return length > 1 ? filtered[length - 1] : '/';
    }
}
