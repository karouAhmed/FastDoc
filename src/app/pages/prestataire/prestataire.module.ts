import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PrestatairePage} from './prestataire.page';
import {PrestatairePageRouterModule} from './prestataire.router.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,

        PrestatairePageRouterModule
    ],
    declarations: [PrestatairePage]
})
export class PrestatairePageModule {
}
