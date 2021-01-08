import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecherchePage} from './recherche.page';

describe('RecherchePage', () => {
    let component: RecherchePage;
    let fixture: ComponentFixture<RecherchePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecherchePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecherchePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
