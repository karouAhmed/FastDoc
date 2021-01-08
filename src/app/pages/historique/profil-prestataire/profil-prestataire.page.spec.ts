import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilPrestatairePage} from './profil-prestataire.page';

describe('ProfilPrestatairePage', () => {
    let component: ProfilPrestatairePage;
    let fixture: ComponentFixture<ProfilPrestatairePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilPrestatairePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfilPrestatairePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
