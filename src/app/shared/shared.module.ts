import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../modules/profile/profile.component';
import { ItemboardComponent } from '../modules/itemboard/itemboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HasClaimDirective } from './has-claim.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        ProfileComponent,
        ItemboardComponent,
        NotFoundComponent,
        HasClaimDirective,
        ConfirmDialogComponent,
    ],

    imports: [
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModule,
        HasClaimDirective,
    ],
})
export class SharedModule {}
