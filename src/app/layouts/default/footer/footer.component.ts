/* eslint-disable @typescript-eslint/no-unused-expressions */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { version } from '@app/../../package.json';
enum TabState {
    default = 'default',
    open = 'open',
}
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    animations: [
        trigger('tabState', [
            state(
                'default',
                style({
                    transform: 'translateY(0)',
                }),
            ),
            state(
                'open',
                style({
                    bottom: 'initial',
                    top: '81vh',
                }),
            ),
            transition('default <=> open', animate(200)),
        ]),
    ],
})
export class FooterComponent implements OnInit {
    public version: string = version;
    state = 'default';

    constructor() {}

    ngOnInit(): void {
        const a = 0;
    }

    toggleOpenTables() {
        this.state === 'default' ? (this.state = 'open') : (this.state = 'default');
    }
}
