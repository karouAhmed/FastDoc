import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking/booking.service';
import {AuthService} from '../../services/auth/auth.service';
import {CalendarService} from '../../services/calendar/calendar.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-historique',
    templateUrl: './historique.page.html',
    styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit, OnDestroy {
    default: any;
    isClient = false;
    isLoading = true;
    reservationRefs: any[] = [];
    reservations: any[] = [];
    rdvs: any[] = [];
    color = '';
    disable = false;
    private userID: string;
    private subscribed1: Subscription;
    private subscribed2: Subscription;

    constructor(private booking: BookingService,
                private authService: AuthService,
                private calendarService: CalendarService,
                private router: Router,
                public alertController: AlertController,
    ) {
        this.userID = this.authService.userID;
    }

    ngOnInit() {
        this.isLoading = true;
        if (this.authService.isClient) {
            this.isClient = true;
            this.loadAllReservation();
            this.default = '/client';
        } else {
            this.isClient = false;
            this.loadAllAppointements();
            this.default = '/prestataire';
        }
    }

    async loadAllReservation() {
        if (this.reservationRefs || this.reservationRefs.length > 0) {
            this.reservationRefs.slice(0, this.reservationRefs.length);
        }
        this.subscribed1 = await this.booking.getAllBookings().subscribe(res => {
            this.disable = true;
            this.reservations = [];
            if (res.length > 0) {
                this.reservationRefs = res;
                this.reservationRefs.forEach(async (ref) => {
                    this.reservations.push({
                        profession: ref.profession,
                        prestataireID: ref.serviceID,
                        rendezVousID: ref.rendezVousID,
                        prestationID: ref.id,
                        statut: ref.statut
                    });
                    this.disable = false;
                    this.isLoading = false;
                });
            } else {
                this.isLoading = false;
            }

        }, error1 => {
            console.log(error1);
            this.isLoading = false;
        });
    }

    async loadAllAppointements() {

        this.subscribed2 = await this.calendarService.getAllApointment(this.userID).subscribe(res => {
            this.disable = true;
            this.rdvs = [];
            if (res.length > 0) {
                this.rdvs = res;
                this.rdvs.forEach(rdv => {
                    rdv.startTime = rdv.startTime.toDate();
                    rdv.endTime = rdv.endTime.toDate();
                });
                this.disable = false;
                this.isLoading = false;
                console.log(this.rdvs);
            } else {
                this.isLoading = false;
            }

        }, error1 => {
            console.log(error1);
            this.isLoading = false;
        });
    }

    showProfile(res: any) {
        this.router.navigate(['historique', 'profil-prestataire'], {queryParams: {value: JSON.stringify(res.prestataireID)}});
    }

    async deleteHistory() {
        const alert = await this.alertController.create({
            header: 'Supprimer la historique!',
            message: 'Votre historique sera supprimer d une façon définitive,voulez-vous vraiment la <strong>continuation</strong>!!!',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Oui',
                    handler: () => {
                        if (this.isClient) {
                            this.reservationRefs.forEach(ref => {
                                this.booking.deletBooking(ref.id);
                            });
                        } else {
                            this.rdvs.forEach(rd => {
                                this.calendarService.deleteAppointment(rd.id, this.userID);

                            });

                        }
                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        await alert.present();
    }

    ngOnDestroy(): void {
        if (this.subscribed1) {
            this.subscribed1.unsubscribe();
        }
        if (this.subscribed2) {
            this.subscribed2.unsubscribe();
        }
    }
}

