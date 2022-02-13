import { Component } from '@angular/core';
import { injectMocks } from 'data-mocks';
import { DEFAULT_SCENARIO } from './shared/mock-api-data';

const scenarios: any = {
    default: DEFAULT_SCENARIO as any,
};

injectMocks(scenarios, 'default', {
    allowXHRPassthrough: true,
    allowFetchPassthrough: true,
});
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'pos2021';
}
