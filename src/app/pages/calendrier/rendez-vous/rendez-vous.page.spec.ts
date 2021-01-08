import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RendezVousPage} from './rendez-vous.page';

describe('RendezVousPage', () => {
    let component: RendezVousPage;
    let fixture: ComponentFixture<RendezVousPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RendezVousPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RendezVousPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
