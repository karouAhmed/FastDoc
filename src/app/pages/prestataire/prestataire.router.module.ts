import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrestatairePage} from './prestataire.page';


const routes: Routes = [
    {
        path: 'prestataire',
        component: PrestatairePage,
        children: [
            {
                path: 'calendrier',
                children: [
                    {
                        path: '',
                        loadChildren: '../calendrier/calendrier.module#CalendrierPageModule'
                    },
                    {
                        path: ':id',
                        loadChildren: '../calendrier/rendez-vous/rendez-vous.module#RendezVousPageModule'
                    }

                ]
            },
            {
                path: 'notification',
                children: [
                    {
                        path: '',
                        loadChildren: '../notification/notification.module#NotificationPageModule'
                    }
                ]
            },
            {
                path: 'personnalisation',
                children: [
                    {
                        path: '',
                        loadChildren: '../personnalisation/personnalisation.module#PersonnalisationPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/prestataire/calendrier',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/prestataire/calendrier',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule, RouterModule.forChild(routes)
    ], exports: [RouterModule]

})
export class PrestatairePageRouterModule {
}
