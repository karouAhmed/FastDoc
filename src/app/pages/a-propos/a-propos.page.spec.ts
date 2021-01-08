import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AProposPage} from './a-propos.page';

describe('AboutPage', () => {
    let component: AProposPage;
    let fixture: ComponentFixture<AProposPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AProposPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AProposPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
