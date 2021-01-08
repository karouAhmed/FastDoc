import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ClientPage} from './client.page';


const routes: Routes = [
    {
        path: 'client',
        component: ClientPage,
        children: [
            {
                path: 'recherche',
                children: [
                    {
                        path: '',
                        loadChildren: '../recherche/recherche.module#RecherchePageModule'
                    },
                    {
                        path: 'profil',
                        loadChildren: '../recherche/profil/profil.module#ProfilPageModule'
                    }

                ]
            },
            {
                path: 'reservation',
                children: [
                    {
                        path: '',
                        loadChildren: '../reservation/reservation.module#ReservationPageModule'
                    },
                    {
                        path: 'reservation-detaille',
                        loadChildren: '../reservation/reservation-detaille/reservation-detaille.module#ReservationDetaillePageModule'
                    }
                ]
            },
            {
                path: 'notification',
                children: [
                    {
                        path: '',
                        loadChildren: '../notification/notification.module#NotificationPageModule'
                    },
                    {
                        path: 'profil',
                        loadChildren: '../recherche/profil/profil.module#ProfilPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/client/recherche',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/client/recherche',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule, RouterModule.forChild(routes)
    ], exports: [RouterModule]
})
export class ClientPageRouterModule {
}
