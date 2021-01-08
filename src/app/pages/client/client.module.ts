import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {IonicModule} from '@ionic/angular';

import {ClientPage} from './client.page';
import {ClientPageRouterModule} from './client.router.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClientPageRouterModule
    ],
    declarations: [ClientPage]
})
export class ClientPageModule {
}
