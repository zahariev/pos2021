import { UserService } from '@app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user';
@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
    sidebarOpen = true;
    user!: User | null;
    constructor(public userService: UserService) {
        this.userService.user$.subscribe((user) => {
            this.user = user;
        });
    }

    sideBarToggler(): void {
        this.sidebarOpen = !this.sidebarOpen;
    }
}
