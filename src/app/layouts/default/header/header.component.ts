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
import { UserService } from '@app/shared/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Output() toggleSidebarForMe: EventEmitter<boolean> = new EventEmitter();
    @ViewChild('searchInput') searchInput!: ElementRef;

    value = '';
    user!: User;
    constructor(public authService: AuthService, public userService: UserService) {
        userService.activeUser.subscribe((user: any) => (this.user = user));
    }

    ngOnInit(): void {
        const a = '';
    }

    menuClick() {}

    toggleSidebar() {
        this.toggleSidebarForMe.emit();

        // Event triggering to resize components in Content container
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }

    search(event: Event) {
        const target = event.target as HTMLTextAreaElement;

        this.value = target.value;
    }
    signOut() {}
}
