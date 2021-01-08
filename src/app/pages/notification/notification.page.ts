import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth/auth.service';
import {NotificationService} from '../../services/notification/notification.service';
import {Subscription} from 'rxjs';
import {AlertController, LoadingController} from '@ionic/angular';
import {ServiceService} from '../../services/service/service.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-notification',
    templateUrl: './notification.page.html',
    styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit, OnDestroy {

    private userID: string;
    private notificationsRef: any[];
    private notification: any[] = [];
    private isLoading: boolean;
    private Client: boolean;
    private subscribed: Subscription;
    disable = true;

    constructor(private db: AngularFirestore,
                private authService: AuthService,
                private notificationService: NotificationService,
                private loadingCtrl: LoadingController,
                private service: ServiceService,
                private router: Router,
                public alertController: AlertController) {
        this.userID = this.authService.userID;
    }

    ngOnInit() {
        this.isLoading = true;
        this.loadNotifications(this.userID);
    }

    loadNotifications(userID) {
        if (this.authService.isClient) {
            this.Client = true;
            this.subscribed = this.notificationService.getAllNotificationsClient(userID).subscribe(res => {
                this.notification = [];
                if (res.length > 0) {
                    this.notificationsRef = res;
                    console.log(this.notificationsRef);
                    this.showNotification(this.notificationsRef);
                } else {
                    this.isLoading = false;
                }
            });
        } else {
            this.Client = false;
            this.subscribed = this.notificationService.getAllNotificationsPrestataire(userID).subscribe(res => {
                this.notification = [];
                if (res.length > 0) {
                    this.notificationsRef = res;
                    console.log(this.notificationsRef);
                    this.showNotification(this.notificationsRef);
                } else {
                    this.isLoading = false;
                }
            });
        }
    }

    showNotification(notifications) {
        this.disable = true;
        notifications.forEach(notif => {
            const Copy = notif.contenu.plage;
            Copy.startTime = Copy.startTime.toDate();
            Copy.endTime = Copy.endTime.toDate();
            notif.date = notif.date.toDate();
            this.notification.push({
                Text: notif.contenu.message,
                debut: Copy.startTime,
                fin: Copy.endTime,
                p: notif.date,
                vu: notif.vu,
                id: notif.id,
                sender: notif.contenu.sender
            });
            this.isLoading = false;
            this.disable = false;

        });
    }

    ngOnDestroy(): void {

        if (this.subscribed) {
            this.subscribed.unsubscribe();
        }
    }

    async showDetails(res: any) {
        const loader = await this.loadingCtrl.create({
            translucent: true
        });
        loader.present();
        this.notificationService.setNotificationAsSeen(res.id).then(() => {
            if (res.Text === 'Actuellement rendez-vous disponible') {
                this.service.loadService(res.sender).subscribe(ser => {
                    let data;
                    data = {
                        id: res.sender,
                        profession: ser.profession,
                        gouvernement: ser.gouvernement,
                        ville: ser.ville,
                        adresse: ser.adresse,
                        startTime: new Date(res.debut),
                        endTime: new Date(res.fin)

                    };
                    this.router.navigate(['client', 'notification', 'profil'], {queryParams: {value: JSON.stringify(data)}}).then(() => {
                        loader.dismiss();
                    });

                });
            } else {
                if (res.Text === 'Nouveau rendez-vous a été ajouter') {
                    this.router.navigate(['prestataire', 'calendrier']).then(() => {
                        loader.dismiss();
                    });
                } else {
                    this.router.navigate(['historique']).then(() => {
                        loader.dismiss();
                    });
                }

            }
        });


    }

    async deleteNotifications() {
        const alert = await this.alertController.create({
            header: 'Supprimer les notifications!',
            message: 'Vos notification serons supprimer d une façon définitive,voulez-vous vraiment la <strong>continuation</strong>!!!',
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
                        this.notificationsRef.forEach(no => {
                            this.notificationService.deleteNotification(no.id);
                        });

                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        await alert.present();
    }
}
