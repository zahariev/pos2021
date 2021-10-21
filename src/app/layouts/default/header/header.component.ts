import { AuthService } from '@app/core/auth/auth.service';
import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    Input,
    ViewChild,
} from '@angular/core';
import { User } from '@shared/models/user';
import { UserService } from '@app/shared/services/auth/user.service';
import { MenuService } from '@app/core/services/menu.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Output() toggleLeftBarForMe: EventEmitter<string> = new EventEmitter();
    @Output() toggleRightBarForMe: EventEmitter<string> = new EventEmitter();
    @ViewChild('searchInput') searchInput!: ElementRef;

    value = '';
    user!: User;
    constructor(
        public authService: AuthService,
        public userService: UserService,
        public menuService: MenuService,
    ) {
        userService.activeUser.subscribe((user: any) => (this.user = user));
    }

    ngOnInit(): void {
        const a = '';
    }

    menuClick() {}

    toggleLeftSidebar() {
        this.toggleLeftBarForMe.emit();

        // Event triggering to resize components in Content container
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }

    toggleRightSidebar() {
        this.toggleRightBarForMe.emit();

        // Event triggering to resize components in Content container
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }

    search(event: KeyboardEvent) {
        const target = event.target as HTMLTextAreaElement;

        this.value = target.value;
        if (this.value[0] === '*') {
            this.cancelSearch();

            switch (this.value) {
                case '*edit':
                    if (event.key === 'Enter')
                        this.userService.editMode = !this.userService.editMode;
                    break;
                case '*area':
                    // coose table area to show list
                    break;

                case '*Yat4f':
                    break;

                default:
            }
        } else if (this.value.length > 2) {
            this.menuService.filterMenu(this.value);
        } else this.cancelSearch();
    }

    cancelSearch() {
        this.menuService.filterMenu('');
        this.menuService.getTabs();
        // this.menuService.getMenuData();
    }
    signOut() {}
}
