import { Component, OnInit } from '@angular/core';
import { MenuService } from '@app/core/services/menu.service';

@Component({
    selector: 'app-itemboard',
    templateUrl: './itemboard.component.html',
    styleUrls: ['./itemboard.component.scss'],
})
export class ItemboardComponent implements OnInit {
    menu: any = [];
    tabs: any = [];
    constructor(private menuService: MenuService) {
        this.menuService.menu.subscribe((menu: any) => {
            if (menu?.items) this.menu = menu.items;
            console.log(this.menu);
        });

        this.menuService.tabs.subscribe((tabs: any) => {
            if (this.tabs) this.tabs = tabs;
            console.log(this.tabs);
        });
    }

    ngOnInit(): void {
        const a = 0;
    }
}
