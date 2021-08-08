/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'subItemList',
    templateUrl: './sub-item-list.component.html',
    styleUrls: ['./sub-item-list.component.scss'],
})
export class SubItemListComponent implements OnInit {
    group: any;
    @Output() closeEvent: EventEmitter<any> = new EventEmitter();
    @Output() clickItemEvent: EventEmitter<any> = new EventEmitter();

    constructor(
        public dialogRef: MatDialogRef<SubItemListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        console.log(data);
        this.group = data;
    }

    ngOnInit(): void {
        const a = 0;
    }

    clickItem(item: any) {
        this.clickItemEvent.emit(item);
    }

    closeDialog() {
        this.dialogRef.close();
    }

    public mouseLeave() {
        this.closeEvent.emit();
        // console.log("leave")
    }
}
