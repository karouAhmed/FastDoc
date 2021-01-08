import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Rdv} from '../../../interfaces/rdv';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {CalendarService} from '../../../services/calendar/calendar.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-rendez-vous',
    templateUrl: './rendez-vous.page.html',
    styleUrls: ['./rendez-vous.page.scss'],
})
export class RendezVousPage implements OnInit, OnDestroy {
    rdv: Rdv = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        telephone: 0,
        userID: '',
        statut: ''

    };
    rdvid = null;
    private subscribed: Subscription;
    private userID: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private loadingController: LoadingController,
                private calService: CalendarService,
                private nav: NavController,
                private authService: AuthService,
                public alertController: AlertController) {
        this.userID = authService.userID;
    }

    ngOnInit() {
        this.rdvid = this.route.snapshot.params['id'];
        if (this.rdvid) {
            this.loadAppointment();
        }
    }

    async loadAppointment() {
        const loading = await this.loadingController.create({
            message: 'Chargement rendez-vous..'
        });
        await loading.present();

        this.subscribed = this.calService.getAppointment(this.rdvid, this.userID).subscribe(res => {
            loading.dismiss();
            this.rdv = res;

            this.rdv.startTime = this.rdv.startTime.toDate().toISOString();
            this.rdv.endTime = this.rdv.endTime.toDate().toISOString();

        });
    }

    ngOnDestroy(): void {
        if (this.subscribed) {
            this.subscribed.unsubscribe();
        }
    }

    async cancelAppointement() {
        const load = await this.loadingController.create({
            message: 'Suppression..'
        });
        const alert = await this.alertController.create({
            header: 'Annulation de rendez-vous!',
            message: 'Voulez-vous vraiment annuler le <strong>rendez-vous</strong>!!!',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Oui',
                    handler: () => {
                        load.present();
                        this.calService.cancelAppointement(this.rdvid, this.userID, this.rdv).then(() => {
                            load.dismiss();
                            this.nav.navigateBack('/prestataire/calendrier');
                        });
                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        await alert.present();
    }
}
