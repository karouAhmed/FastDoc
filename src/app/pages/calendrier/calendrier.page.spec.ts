import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendrierPage} from './calendrier.page';

describe('CalendrierPage', () => {
    let component: CalendrierPage;
    let fixture: ComponentFixture<CalendrierPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendrierPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendrierPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
