import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Profil} from '../../../interfaces/profil';
import {ProfilService} from '../../../services/profil/profil.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../../../services/service/service.service';
import {Service} from '../../../interfaces/service';
import {BookingService} from '../../../services/booking/booking.service';
import {RateService} from '../../../services/rate/rate.service';

@Component({
    selector: 'app-reservation-detaille',
    templateUrl: './reservation-detaille.page.html',
    styleUrls: ['./reservation-detaille.page.scss'],
})
export class ReservationDetaillePage implements OnInit, OnDestroy {
    data: any;
    prestataireProfil: Profil;
    public isLoading = false;
    service: Service;
    rdv: any;
    private subscribed1: Subscription;
    private subscribed2: Subscription;
    private subscribed3: Subscription;

    rate: number;
    rating: any[];
    numberRatings: number;

    constructor(private router: Router,
                public activatedRoute: ActivatedRoute,
                private profilService: ProfilService,
                private loadingCtrl: LoadingController,
                private detailService: ServiceService,
                private bookingServie: BookingService,
                public alertController: AlertController,
                private ratingService: RateService,
                private zone: NgZone
    ) {

    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(res => {
            this.data = JSON.parse(res.value);
            this.loadDeatils(this.data.prestataireID, this.data.rendezVousID);
        });
    }

    async loadDeatils(prestataireID: string, rdvID: string) {
        this.isLoading = true;
        const loader = await this.loadingCtrl.create({});
        loader.present();
        this.subscribed1 = this.profilService.loadProfile(prestataireID).subscribe(res => {
            this.prestataireProfil = res;
            this.subscribed2 = this.detailService.loadService(prestataireID).subscribe(ser => {
                this.service = ser;
                this.ratingService.loadRatings(prestataireID).subscribe(avis => {
                    if (avis.length > 0) {
                        this.rating = avis;
                        this.avg();
                        this.numberRatings = this.rating.length;
                    }
                });
                this.subscribed3 = this.bookingServie.getBooking(prestataireID, rdvID).subscribe(rv => {
                    if (rv) {
                        this.rdv = rv;
                        this.rdv.startTime = this.rdv.startTime.toDate();
                        this.rdv.endTime = this.rdv.endTime.toDate();
                        loader.dismiss();
                        this.isLoading = false;
                    }
                });

            });

        });
    }

    ngOnDestroy(): void {
        if (this.subscribed1) {
            this.subscribed1.unsubscribe();
        }
        if (this.subscribed2) {
            this.subscribed2.unsubscribe();
        }
        if (this.subscribed3) {
            this.subscribed3.unsubscribe();
        }
    }

    avg() {
        let sum = 0;
        this.rating.forEach(rt => {
            sum += rt.rating;
        });
        this.rate = sum / this.rating.length;
    }

    async cancelAppointment() {
        const alert = await this.alertController.create({
            header: 'Annulation de réservation!',
            message: 'Voulez-vous vraiment annuler la <strong>réservation</strong>!!!',
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

                        // tslint:disable-next-line:max-line-length
                        this.bookingServie.cancelBooking(this.data.prestataireID, this.data.rendezVousID, this.data.prestationID, this.rdv);
                        this.zone.run(async () => {
                            await this.router.navigate(['client', 'reservation']);
                        });

                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        await alert.present();
    }
}
