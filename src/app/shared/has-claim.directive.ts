/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from './services/user.service';

@Directive({
    selector: '[hasClaim]',
})
export class HasClaimDirective {
    @Input() set hasClaim(claimType: any) {
        if (this.userService.hasClaim(claimType))
            this.viewContainer.createEmbeddedView(this.templateRef);
        else this.viewContainer.clear();
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userService: UserService,
    ) {}
}
