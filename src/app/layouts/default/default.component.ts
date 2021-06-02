/* eslint-disable @typescript-eslint/no-unused-expressions */
import { UserService } from '@app/shared/services/auth/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
const map: { [key: string]: string } = {};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
const getProperty = function <T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
};
@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
    leftBarOpen = false;
    rightBarOpen = true;
    state = 'default';
    user!: User | null;
    constructor(public userService: UserService, private router: Router) {
        this.userService.user$.subscribe((user) => {
            this.user = user;
        });
    }

    leftBarToggler(): void {
        this.leftBarOpen = !this.leftBarOpen;
        if (!this.leftBarOpen) this.router.navigate(['/itemboard']);
        else this.router.navigate(['/dashboard']);
    }

    rightBarToggler(): void {
        // this.rightBarOpen = !this.rightBarOpen;
    }
}
