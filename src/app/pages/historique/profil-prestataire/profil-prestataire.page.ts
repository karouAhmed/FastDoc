import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../../services/service/service.service';
import {ProfilService} from '../../../services/profil/profil.service';
import {Profil} from '../../../interfaces/profil';
import {Service} from '../../../interfaces/service';
import {RateService} from '../../../services/rate/rate.service';
import {AlertController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profil-prestataire',
    templateUrl: './profil-prestataire.page.html',
    styleUrls: ['./profil-prestataire.page.scss'],
})
export class ProfilPrestatairePage implements OnInit, OnDestroy {
    isLoading = true;
    rate: any;
    rateB: any;
    rating: any[];
    numbreRatings: number;
    private prestataireID: string;
    private prestataireProfil: Profil;
    private service: Service;

    private subscribed1: Subscription;
    private subscribed2: Subscription;
    private subscribed3: Subscription;

    constructor(private router: Router,
                public activatedRoute: ActivatedRoute,
                private detailService: ServiceService,
                private detailleProfil: ProfilService,
                private ratingService: RateService,
                private altr: AlertController) {
        this.activatedRoute.queryParams.subscribe(res => {
            this.prestataireID = JSON.parse(res.value);
        });
    }

    ngOnInit() {
        this.loadProfil();
    }

    loadProfil() {
        this.isLoading = true;
        this.subscribed1 = this.detailleProfil.loadProfile(this.prestataireID).subscribe(profil => {
            this.prestataireProfil = profil;
            this.subscribed2 = this.detailService.loadService(this.prestataireID).subscribe(ser => {
                this.service = ser;
                this.subscribed3 = this.ratingService.loadRatings(this.prestataireID).subscribe(res => {
                    if (res.length > 0) {
                        this.rating = res;
                        this.avg();
                        this.numbreRatings = this.rating.length;
                        this.isLoading = false;
                    } else {
                        this.isLoading = false;
                    }
                    this.ratingService.loadRating(this.prestataireID).subscribe(rateRes => {
                        if (rateRes) {
                            let rateCopy: any;
                            rateCopy = rateRes;
                            this.rateB = rateCopy.rating;
                        }
                    });

                });

            });
        });
    }

    avg() {
        let sum = 0;
        this.rating.forEach(rt => {
            sum += rt.rating;
        });
        this.rate = sum / this.rating.length;
    }

    Confirmer() {
        const ratingcopy = {
            rating: this.rateB
        };
        try {
            this.ratingService.addRating(this.prestataireID, ratingcopy);
            this.showAlert('Evaluation reussite', 'Altert');
            this.router.navigate(['historique']);
        } catch (e) {
            this.showAlert(e.message, 'Evaluation échouée');
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
