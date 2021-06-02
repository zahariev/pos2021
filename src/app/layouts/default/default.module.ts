import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RightBarComponent } from '@app/core/right-bar/right-bar.component';
import { OrderComponent } from '@app/core/order/order.component';
import { HistoryComponent } from '@app/core/history/history.component';
import { OpenbillDetailsComponent } from '@app/core/openbill-details/openbill-details.component';

@NgModule({
    declarations: [
        DefaultComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        RightBarComponent,
        OrderComponent,
        HistoryComponent,
        OpenbillDetailsComponent,
    ],
    imports: [CommonModule, MaterialModule, RouterModule, SharedModule, HttpClientModule],
    providers: [],
})
export class DefaultModule {}
