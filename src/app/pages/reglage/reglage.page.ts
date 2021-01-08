import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth/auth.service';
import {Profil} from '../../interfaces/profil';
import {ProfilService} from '../../services/profil/profil.service';

@Component({
    selector: 'app-reglage',
    templateUrl: './reglage.page.html',
    styleUrls: ['./reglage.page.scss'],
})
export class ReglagePage implements OnInit {
    public profil: Profil;
    lang: any;
    enableNotifications: any;
    paymentMethod: any;
    currency: any;
    enableHistory: any;

    languages: any = ['English', 'Portuguese', 'French'];
    paymentMethods: any = ['Paypal', 'Credit Card'];
    currencies: any = ['USD', 'BRL', 'EUR'];

    constructor(public navCtrl: NavController,
                private authService: AuthService, private data: ProfilService) {
        /* this.auth.auth.onAuthStateChanged((user) => {
             if (user) {
                 data.loadProfil().subscribe(res => {
                     this.profil = res;
                 });
             } else {
                 console.log('not auth');
             }
         });*/
        data.loadProfile(authService.userID).subscribe(res => {
            this.profil = res;
        });
    }

    ngOnInit() {
    }

    editProfile() {
        this.navCtrl.navigateForward('edit-profile');
    }

    logout() {
        this.authService.logout();
    }

}
