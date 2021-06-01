import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PersistanceService {
    constructor() {}

    /* Set Items From Localstorage */
    set(key: string, data: any): void {
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (e) {}
    }

    /* Get Items From Localstorage */
    get(key: string): string | null {
        try {
            return JSON.parse(sessionStorage.getItem(key) || '{}');
        } catch (e) {
            return null;
        }
    }

    /* Remove Items From Localstorage */
    remove(key: string): void {
        try {
            sessionStorage.removeItem(key);
        } catch (e) {}
    }

    /* Clear All Items */
    clear(): void {
        try {
            sessionStorage.clear();
        } catch (e) {}
    }
}
