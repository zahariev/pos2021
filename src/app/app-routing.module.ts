import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AuthGuard } from './core/auth/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ItemboardComponent } from './modules/itemboard/itemboard.component';

const routes: Routes = [
    // {
    //     path: 'login',
    //     loadChildren: () => import('./auth/login.module').then((mod) => mod.LoginModule),
    // },
    {
        path: '',
        component: DefaultComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'itemboard',
                component: ItemboardComponent,
                canActivate: [AuthGuard],
            },

            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],
            },

            {
                path: 'user-profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
            },

            {
                path: 'notfound',
                component: NotFoundComponent,
                canActivate: [AuthGuard],
            },

            { path: '', redirectTo: 'itemboard', pathMatch: 'full' },

            // { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
        ],
    },

    { path: '', redirectTo: 'itemboard', pathMatch: 'full' },
    { path: '404', redirectTo: 'itemboard', pathMatch: 'full' },
    { path: '**', redirectTo: '404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
