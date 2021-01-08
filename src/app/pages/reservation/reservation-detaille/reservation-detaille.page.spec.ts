import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationDetaillePage} from './reservation-detaille.page';

describe('ReservationDetaillePage', () => {
    let component: ReservationDetaillePage;
    let fixture: ComponentFixture<ReservationDetaillePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReservationDetaillePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReservationDetaillePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
