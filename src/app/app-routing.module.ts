import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth.guard';

const routes: Routes = [
    {path: '', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
    {path: 'a-propos', loadChildren: './pages/a-propos/a-propos.module#AProposPageModule', canActivate: [AuthGuard]},
    {
        path: 'historique',
        children: [
            {
                path: '',
                loadChildren: './pages/historique/historique.module#HistoriquePageModule'
            },
            {
                path: 'profil-prestataire',
                loadChildren: './pages/historique/profil-prestataire/profil-prestataire.module#ProfilPrestatairePageModule'
            }
        ],
        canActivate: [AuthGuard]
    },
    {path: 'reglage', loadChildren: './pages/reglage/reglage.module#ReglagePageModule', canActivate: [AuthGuard]},
    {path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule', canActivate: [AuthGuard]},
    {path: '', loadChildren: './pages/prestataire/prestataire.module#PrestatairePageModule', canActivate: [AuthGuard]},
    {path: '', loadChildren: './pages/client/client.module#ClientPageModule', canActivate: [AuthGuard]}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
