import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PersonnalisationPage} from './personnalisation.page';

const routes: Routes = [
    {
        path: '',
        component: PersonnalisationPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PersonnalisationPage]
})
export class PersonnalisationPageModule {
}
