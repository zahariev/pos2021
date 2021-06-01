import { TestBed } from '@angular/core/testing';

import { PersistanceService } from './persistance.service';

describe('persistanceService', () => {
    let service: PersistanceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PersistanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
