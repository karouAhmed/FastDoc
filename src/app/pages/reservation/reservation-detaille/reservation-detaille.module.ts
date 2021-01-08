import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ReservationDetaillePage} from './reservation-detaille.page';
import {IonicRatingModule} from 'ionic4-rating/dist';

const routes: Routes = [
    {
        path: '',
        component: ReservationDetaillePage
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
    declarations: [ReservationDetaillePage]
})
export class ReservationDetaillePageModule {
}
