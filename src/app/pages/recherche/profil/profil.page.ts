import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfilService} from '../../../services/profil/profil.service';
import {Profil} from '../../../interfaces/profil';
import {BookingService} from '../../../services/booking/booking.service';
import {AlertController} from '@ionic/angular';
import {RateService} from '../../../services/rate/rate.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.page.html',
    styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit, OnDestroy {
    prestataireProfil: any;
    profil: Profil;
    clientProfil: Profil;
    hideprofil = false;
    public reservation = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        telephone: 0,
    };
    userID: string;
    rate: number;
    rating: any[];
    numberRatings: number;

    private subscribed1: Subscription;
    private subscribed2: Subscription;
    private subscribed3: Subscription;

    constructor(public activatedRoute: ActivatedRoute,
                private profileData: ProfilService,
                private bookingService: BookingService,
                private altr: AlertController,
                private router: Router,
                private ratingService: RateService,
                private authService: AuthService) {
        this.activatedRoute.queryParams.subscribe(res => {
            this.prestataireProfil = JSON.parse(res.value);
            this.subscribed1 = this.profileData.loadProfile(this.prestataireProfil.id).subscribe(pr => {
                this.profil = pr;
            });

        });
        this.userID = authService.userID;
        this.subscribed2 = this.profileData.loadProfile(this.userID).subscribe(cpr => {
            this.clientProfil = cpr;
            this.reservation.title = this.clientProfil.nom;
            this.reservation.telephone = this.clientProfil.telephone;
        });
        this.subscribed3 = this.ratingService.loadRatings(this.prestataireProfil.id).subscribe(res => {
            if (res.length > 0) {
                this.rating = res;
                this.avg();
                this.numberRatings = this.rating.length;
            }
        });
    }

    ngOnInit() {
    }

    avg() {
        let sum = 0;
        this.rating.forEach(rt => {
            sum += rt.rating;
        });
        this.rate = sum / this.rating.length;
    }

    reserver() {
        const rdvCopy = {
            title: this.reservation.title,
            desc: this.reservation.desc,
            startTime: new Date(this.prestataireProfil.startTime),
            endTime: new Date(this.prestataireProfil.endTime),
            telephone: +this.reservation.telephone,
            userID: this.userID,
            statut: 'EC'
        };
        try {
            this.bookingService.addBooking(rdvCopy, this.prestataireProfil.id, this.prestataireProfil.profession).then(() => {
                this.showAlert('Réservation reussite', 'Altert');
                this.router.navigate(['client']);
            });
        } catch (e) {
            this.showAlert(e.message, 'Réservation échouée');
        }
    }

    private showAlert(message: string, header: string) {
        this.altr.create({header: header, message: message, buttons: ['okay']}).then(alter => alter.present());
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
}
