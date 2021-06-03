import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RightBarComponent } from '@app/layouts/default/right-bar/right-bar.component';
import { OrderComponent } from '@app/core/components/order/order.component';
import { HistoryComponent } from '@app/core/components/history/history.component';
import { OpenbillDetailsComponent } from '@app/core/components/openbill-details/openbill-details.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { DetailsComponent } from '@app/core/components/order/details/details.component';
import { ItemListComponent } from '@app/core/components/order/details/item-list/item-list.component';
import { OrderButtonsComponent } from '@app/core/components/order/details/order-buttons/order-buttons.component';

@NgModule({
    declarations: [
        OrderButtonsComponent,
        ItemListComponent,
        DetailsComponent,
        DefaultComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        RightBarComponent,
        OrderComponent,
        HistoryComponent,
        OpenbillDetailsComponent,
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: [],
})
export class DefaultModule {}
