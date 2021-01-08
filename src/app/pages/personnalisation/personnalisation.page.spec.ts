import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonnalisationPage} from './personnalisation.page';

describe('PersonnalisationPage', () => {
    let component: PersonnalisationPage;
    let fixture: ComponentFixture<PersonnalisationPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersonnalisationPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonnalisationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
