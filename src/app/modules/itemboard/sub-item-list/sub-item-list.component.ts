/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'subItemList',
    templateUrl: './sub-item-list.component.html',
    styleUrls: ['./sub-item-list.component.scss'],
})
export class SubItemListComponent implements OnInit {
    @Input() group: any;

    @Output() closeEvent: EventEmitter<any> = new EventEmitter();
    @Output() clickItemEvent: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        const a = 0;
    }

    clickItem(item: any) {
        this.clickItemEvent.emit(item);
    }

    public mouseLeave() {
        this.closeEvent.emit();
        // console.log("leave")
    }
}
