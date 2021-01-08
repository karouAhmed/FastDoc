import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
    selector: 'app-prestataire',
    templateUrl: './prestataire.page.html',
    styleUrls: ['./prestataire.page.scss'],
})
export class PrestatairePage implements OnInit, OnDestroy {

    private notifications: any[];
    private badge: number;
    private userID: string;

    private subscribed1: Subscription;


    constructor(private db: AngularFirestore,
                private authService: AuthService,
                private notificationService: NotificationService) {
        this.userID = this.authService.userID;
    }

    ngOnInit() {
        this.subscribed1 = this.notificationService.getUnseenNotificationsPrestataire(this.userID).subscribe(res => {
            console.log(res);
            this.notifications = res;
            this.badge = this.notifications.length;
        });
    }

    ngOnDestroy(): void {
        if (this.subscribed1) {
            this.subscribed1.unsubscribe();
        }
    }

}
