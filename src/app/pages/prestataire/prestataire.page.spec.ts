import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrestatairePage} from './prestataire.page';

describe('PrestatairePage', () => {
    let component: PrestatairePage;
    let fixture: ComponentFixture<PrestatairePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrestatairePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrestatairePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
