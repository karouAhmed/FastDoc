import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {ActionSheetController, MenuController} from '@ionic/angular';
import {CalendarService} from '../../services/calendar/calendar.service';
import {Rdv} from '../../interfaces/rdv';
import {Router} from '@angular/router';
import {ContraintService} from '../../services/contraint/contraint.service';
import {Contraintes} from '../../interfaces/contraintes';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-calendrier',
    templateUrl: './calendrier.page.html',
    styleUrls: ['./calendrier.page.scss']
})
export class CalendrierPage implements OnInit, OnDestroy {
    @ViewChild(CalendarComponent) myCal: CalendarComponent;
    private rdvs: Rdv[];
    private viewTitle: string;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        local: 'fr-FR'
    };
    collapseCard = false;
    event = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        telephone: ''
    };
    private eventSource = [];
    minDate = new Date().toISOString();
    private subscribed1: Subscription;
    private subscribed2: Subscription;

    private contraintes: Contraintes;
    private userID: string;
    minuteValues: any[];


    constructor(public menuCtrl: MenuController,
                private calService: CalendarService,
                private router: Router,
                public actionSheetController: ActionSheetController,
                private dataContraintes: ContraintService,
                private auth: AngularFireAuth,
                private authService: AuthService) {
        this.userID = this.authService.userID;
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
        this.subscribed1 = this.dataContraintes.loadConstraints(this.userID).subscribe(res => {
            this.contraintes = res;
            this.myCal.step = this.contraintes.dureePrestation;
            this.myCal.startHour = this.contraintes.heureDebut;
            this.myCal.endHour = this.contraintes.heureFin;
            this.myCal.calendarMode = 'month';
            if (this.contraintes.dureePrestation === 15) {
                this.minuteValues = [0, 15, 30, 45];
            } else if (this.contraintes.dureePrestation === 30) {
                this.minuteValues = [0, 30];

            } else {
                this.minuteValues = [0];
            }
        });


    }

    ngOnInit(): void {
        this.rdvs = [];
        this.resetEvent();
        this.myCal.loadEvents();
        this.subscribed2 = this.calService.getAppointments(this.userID).subscribe(res => {
            this.eventSource.splice(0, this.eventSource.length);
            if (this.rdvs.length >= 0) {
                this.rdvs.splice(0, this.rdvs.length);
            }
            this.rdvs = res;
            this.rdvs.forEach(ev => {
                ev.startTime = ev.startTime.toDate();
                ev.endTime = ev.endTime.toDate();
                this.eventSource.push(ev);
            });
            this.myCal.loadEvents();
        });
    }

    addEvent() {
        const eventCopy = {
            title: this.event.title,
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.endTime),
            desc: this.event.desc,
            telephone: +this.event.telephone,
            userID: 'prestataire',
            statut: 'EC'
        };
        this.calService.addAppointment(eventCopy, this.userID);
        this.resetEvent();
    }

    resetEvent() {
        this.event = {
            title: '',
            desc: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            telephone: ''
        };
    }


    async onEventSelected(rdv) {
        this.router.navigate(['prestataire', 'calendrier', rdv.id]);

        /* const action = await this.actionSheetController.create({
             header: 'Rendez-Vous',
             buttons: [{
                 text: 'Modifier',
                 icon: 'create',
                 handler: () => {
                     console.log('modifier');

                     this.router.navigate(['prestataire', 'calendrier', rdv.id]);
                 }
             },
                 {
                     text: 'Supprimer',
                     role: 'destructive',
                     icon: 'trash',
                     handler: () => {
                         console.log('delete');
                         this.calService.cancelAppointement(rdv.id, this.userID);
                     }
                 },
                 {
                     text: 'Annuler',
                     role: 'cancel',
                     icon: 'close',
                     handler: () => {
                         console.log('Annuler');
                     }
                 }]
         });
         await action.present();*/
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onTimeSelected(ev) {
        const selected = new Date(ev.selectedTime);
        this.event.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.event.endTime = (selected.toISOString());
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

    ngOnDestroy(): void {
        if (this.subscribed1) {
            this.subscribed1.unsubscribe();
        }
        if (this.subscribed2) {
            this.subscribed2.unsubscribe();
        }
        console.log('closed');
    }
}
