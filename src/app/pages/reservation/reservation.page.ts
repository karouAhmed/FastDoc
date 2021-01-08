import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking/booking.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.page.html',
    styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
    reservationRefs: any[] = [];
    reservations: any[] = [];
    public isLoading = false;
    private userID: string;

    private subscribed1: Subscription;
    private subscribed2: Subscription;

    constructor(private booking: BookingService,
                private router: Router,
                private afauth: AngularFireAuth,
                private authService: AuthService) {
        this.userID = authService.userID;
    }

    ngOnInit(): void {

    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.loadReservations();
    }

    loadReservations() {
        this.subscribed1 = this.booking.getBookings(this.userID).subscribe(res => {
            this.reservations = [];
            this.reservationRefs = [];
            if (res.length > 0) {
                this.reservationRefs = res;
                if (this.reservations.length > 0) {
                    this.reservations.slice(0, this.reservations.length);
                }
                this.reservationRefs.forEach((ref) => {
                    this.subscribed2 = this.booking.getBooking(ref.serviceID, ref.rendezVousID).subscribe(rdvref => {
                        if (rdvref) {
                            if (rdvref.abonne) {
                                this.reservations.push({
                                    profession: ref.profession,
                                    startTime: rdvref.startTime.toDate(),
                                    endTime: rdvref.endTime.toDate(),
                                    prestataireID: ref.serviceID,
                                    rendezVousID: ref.rendezVousID,
                                    prestationID: ref.id,
                                    abonne: rdvref.abonne
                                });
                            } else {
                                this.reservations.push({
                                    profession: ref.profession,
                                    startTime: rdvref.startTime.toDate(),
                                    endTime: rdvref.endTime.toDate(),
                                    prestataireID: ref.serviceID,
                                    rendezVousID: ref.rendezVousID,
                                    prestationID: ref.id
                                });
                            }
                            this.isLoading = false;
                        }
                    });
                });
            } else {
                console.log(this.reservations);
                console.log(this.reservationRefs);
                this.isLoading = false;
            }

        });

    }

    showDetails(res: any) {
        this.router.navigate(['client', 'reservation', 'reservation-detaille'], {queryParams: {value: JSON.stringify(res)}});
    }

    ionViewDidLeave() {
        if (this.subscribed1) {
            this.subscribed1.unsubscribe();
        }
        if (this.subscribed2) {
            this.subscribed2.unsubscribe();
        }
    }


}
