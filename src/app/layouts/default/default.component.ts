import { UserService } from '@app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user';
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
    leftBarOpen = true;
    rightBarOpen = true;
    user!: User | null;
    constructor(public userService: UserService) {
        this.userService.user$.subscribe((user) => {
            this.user = user;
        });
    }

    leftBarToggler(): void {
        this.leftBarOpen = !this.leftBarOpen;
    }

    rightBarToggler(): void {
        this.rightBarOpen = !this.rightBarOpen;
    }
}
