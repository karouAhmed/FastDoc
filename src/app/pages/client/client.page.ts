import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.page.html',
    styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit, OnDestroy {
    constructor(private authService: AuthService,
                private db: AngularFirestore,
                private notif: NotificationService) {
        this.userID = this.authService.userID;
    }

    private notifs: any[];
    private badge: number;
    private userID: string;

    private subscribed: Subscription;


    ngOnInit() {
        // tslint:disable-next-line:max-line-length
        this.subscribed = this.notif.getUnseenNotificationsClient(this.userID).subscribe(res => {
            this.notifs = res;
            console.log(this.notifs);
            this.badge = this.notifs.length;
        });

    }

    ngOnDestroy(): void {
        if (this.subscribed) {
            this.subscribed.unsubscribe();
        }
    }

}
