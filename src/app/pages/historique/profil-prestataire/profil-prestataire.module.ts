import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProfilPrestatairePage} from './profil-prestataire.page';
import {IonicRatingModule} from 'ionic4-rating/dist';

const routes: Routes = [
    {
        path: '',
        component: ProfilPrestatairePage
    }
];

@NgModule({
    imports: [
        IonicRatingModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ProfilPrestatairePage]
})
export class ProfilPrestatairePageModule {
}
