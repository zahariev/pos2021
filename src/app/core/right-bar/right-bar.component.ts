/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'right-bar',
    templateUrl: './right-bar.component.html',
    styleUrls: ['./right-bar.component.scss'],
})
export class RightBarComponent implements OnInit {
    history = 0;
    bill = 0;
    constructor() {}

    ngOnInit(): void {}
}
