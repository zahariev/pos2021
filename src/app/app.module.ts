import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtInterceptor } from '@app/auth/_helpers/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
export const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
};
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NgxSpinnerModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DefaultModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            useDefaultLang: true,
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
