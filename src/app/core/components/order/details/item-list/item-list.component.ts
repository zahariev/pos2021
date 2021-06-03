import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnChanges {
    @Input() itemList: any;
    @Output() markItemEvent: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {
        const a = 0;
    }

    ngOnChanges(changes: SimpleChanges) {}

    public markItem(item: any, sign = 1) {
        this.markItemEvent.emit({ item, sign });
    }
    public getMixSum(list: any) {
        if (!list || !list.length) return;

        return list;
    }
}
