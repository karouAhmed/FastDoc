import {TestBed} from '@angular/core/testing';

import {ContraintService} from './contraint.service';

describe('ContraintService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ContraintService = TestBed.get(ContraintService);
        expect(service).toBeTruthy();
    });
});
