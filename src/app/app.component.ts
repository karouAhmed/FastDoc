import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {Capacitor, Plugins} from '@capacitor/core';

import {Pages} from './interfaces/pages';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Profil} from './interfaces/profil';
import {AuthService} from './services/auth/auth.service';
import {ProfilService} from './services/profil/profil.service';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public profil: Profil;
    public appPages: Array<Pages>;

    constructor(
        private platform: Platform,
        public navCtrl: NavController,
        private router: Router,
        private data: ProfilService,
        private auth: AngularFireAuth,
        private authService: AuthService) {
        this.auth.auth.onAuthStateChanged((user) => {
            if (user) {
                data.loadProfile(user.uid).subscribe(res => {
                    this.profil = res;

                });
            } else {
                console.log('not auth');
            }
        });

        this.appPages = [
            {
                title: 'Historique',
                url: '/historique',
                direct: 'forward ',
                icon: 'time'
            },
            {
                title: 'A propos',
                url: '/a-propos',
                direct: 'forward',
                icon: 'information-circle-outline'
            },

            {
                title: 'Réglage',
                url: '/reglage',
                direct: 'forward',
                icon: 'cog'
            }
        ];


        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (Capacitor.isPluginAvailable('SplashScreen')) {
                Plugins.SplashScreen.hide();
            }
        });
    }

    goToEditProgile() {
        this.navCtrl.navigateForward('edit-profile');
    }

    logout() {
        this.authService.logout();
    }

    switch() {
        if (!this.authService.isClient) {
            this.router.navigate(['client']);
            this.authService.isClient = true;

        } else {
            this.router.navigate(['prestataire']);
            this.authService.isClient = false;
        }
    }
}
