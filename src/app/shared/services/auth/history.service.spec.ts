import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
    let service: HistoryService;
    const urls = ['/login', '/itemboard/user-profile', '/itemboard/users', '/login'];
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Router,
                    useValue: {
                        url: '/non-pdp/phases/8',
                        events: of(
                            new NavigationEnd(
                                0,
                                'http://localhost:4200/#/non-pdp/phases/8',
                                'http://localhost:4200/#/non-pdp/phases/8',
                            ),
                        ),
                        navigate: jasmine.createSpy('navigate'),
                    },
                },
            ],
            imports: [RouterTestingModule],
        });
        service = TestBed.inject(HistoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getLastNonLoginUrl() function and return true', () => {
        expect(service.getLastNonLoginUrl(urls)).toEqual('/itemboard/users');
    });

    it('should call getPreviousUrl() function and return true', () => {
        expect(service.getPreviousUrl(urls)).toEqual('/itemboard/users');
    });
});
