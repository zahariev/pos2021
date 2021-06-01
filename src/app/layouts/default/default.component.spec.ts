import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DefaultComponent } from './default.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

describe('DefaultComponent', () => {
    let component: DefaultComponent;
    let fixture: ComponentFixture<DefaultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DefaultComponent,
                HeaderComponent,
                SidebarComponent,
                FooterComponent,
                TranslatePipeMock,
            ],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterModule.forRoot([]),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
