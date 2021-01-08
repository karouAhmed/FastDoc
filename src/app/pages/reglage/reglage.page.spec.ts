import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReglagePage} from './reglage.page';

describe('ReglagePage', () => {
    let component: ReglagePage;
    let fixture: ComponentFixture<ReglagePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReglagePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReglagePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
