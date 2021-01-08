import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Service} from '../../interfaces/service';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    servicedoc: AngularFirestoreDocument<Service>;
    service: Observable<Service>;

    constructor(private db: AngularFirestore) {

    }

    loadService(id) {
        this.servicedoc = this.db.doc<Service>('service/' + id);
        this.service = this.servicedoc.valueChanges();
        return this.service;

    }

    updateProfil(id: string, sevice: Service) {
        this.servicedoc = this.db.doc<Service>('service/' + id);
        return this.servicedoc.update(sevice);
    }
}

