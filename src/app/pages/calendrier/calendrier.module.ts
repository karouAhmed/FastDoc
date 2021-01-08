import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';


import {CalendrierPage} from './calendrier.page';
import {NgCalendarModule} from 'ionic2-calendar';

const routes: Routes = [
    {
        path: '',
        component: CalendrierPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgCalendarModule
    ],
    declarations: [CalendrierPage]
})
export class CalendrierPageModule {
}
