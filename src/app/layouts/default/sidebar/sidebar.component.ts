/* eslint-disable @typescript-eslint/prefer-for-of */
import { UserService } from '@app/shared/services/user.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { NestedTreeControl } from '@angular/cdk/tree';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';

const ROOTS = ['dashboard', 'admin', 'system-settings'];
interface TreeNode {
    name: string;
    children?: TreeNode[];
    link?: string;
    id: string;
}

export interface MenuNode {
    name: string;
    link: string;
    level: number;
    id: string;
    children?: MenuNode[];
    hasContent: boolean;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    treeControl = new NestedTreeControl<TreeNode>((node) => node.children);

    expandedNodeID!: number;
    location!: string | undefined;
    isRoutingNode = false;

    public dataSource = new MatTreeNestedDataSource<TreeNode>();

    constructor(
        location: Location,
        private httpClient: HttpClient,
        private userService: UserService,
    ) {
        this.location = location.path().split('/')[1];
    }

    ngOnInit() {
        this.httpClient.get('assets/menu.json').subscribe((data: any) => {
            data = this.formatMenuData(data);

            const menuData = [...this.userService.filterMenu(data)];

            // get active route id to open sidebar tree menu
            menuData.forEach((el: any, id: number) => {
                if (el.path === this.location) {
                    this.expandedNodeID = id;
                    return;
                }
            });

            this.dataSource.data = menuData;
            this.treeControl.dataNodes = this.dataSource.data;
            setTimeout(() => this.expandMenuToUriPatn(), 200);
        });
    }

    convertToTree(data: any[], path: string = '') {
        const children: any = [];
        const roots: any = [];

        data.forEach((item, idx) => {
            if (!item.path.includes('/')) {
                const id = ROOTS.findIndex((el) => el === item.path);

                if (id > -1) roots[id] = item;
            } else if (item.path.includes(path + '/')) {
                children.push(item);
                if (path) data = data.splice(idx, 1);
            }
        });
        if (roots.length) {
            roots.forEach((root: any, id: number) => {
                if (this.location === root.path) {
                    this.expandedNodeID = id;
                }

                root.children = this.convertToTree(children, root.path);
            });
            return roots;
        } else {
            children.forEach((child: any) => {
                child.children = this.convertToTree(children, child.path);
            });

            return children;
        }
    }

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    stringToPathSafety(link: string): string {
        return link.toLowerCase().replace(' ', '-');
    }

    toggleTree(name: any, event: Event): void {
        event.stopPropagation();
    }

    expandMenuToUriPatn() {
        this.treeControl.expand(this.treeControl.dataNodes[this.expandedNodeID]);
    }

    formatMenuData(data: any[]) {
        // strip down 2nd level childs
        const newMenu: any = [];
        data.forEach((menu: any) => {
            menu.children?.forEach((item: any) => {
                delete item.children;
            });

            newMenu.push(menu);
        });
        return newMenu;
    }

    convertToMenuTree(menu: any, route: string = ''): TreeNode[] {
        const result = [];
        //delete menu.DASHBOARD;
        for (const item in menu) {
            if (menu.hasOwnProperty(item)) {
                if (menu[item].TITLE) {
                    const title = menu[item].TITLE;
                    const link = this.stringToPathSafety(title);
                    delete menu[item].TITLE;
                    const node = {
                        name: title,
                        children: this.convertToMenuTree(menu[item], link),
                        link: '',
                        id: title,
                    };
                    if (this.isRoutingNode) {
                        this.expandedNodeID = result.length;
                    }
                    result.push(node);
                } else {
                    const id = item.toLowerCase().replace('_', '-');
                    const nodeItem = {
                        name: menu[item],
                        children: [],
                        link: route ? route + '/' + id : id,
                        id,
                    };

                    result.push(nodeItem);
                    if (id === this.location) this.isRoutingNode = true;
                }
            }
        }

        return result;
    }
}
