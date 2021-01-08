import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../interfaces/user';
import {Router} from '@angular/router';
import {Profil} from '../../interfaces/profil';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {ProfilService} from '../profil/profil.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userID: string;

    set isServeur(value: boolean) {
        this._isServeur = value;
    }

    profil: Observable<Profil>;
    p: Profil;

    constructor(private auth: AngularFireAuth,
                private db: AngularFirestore,
                private router: Router,
                private data: ProfilService,
                private altr: AlertController) {
    }

    private _userAuthentificated = false;

    get userID(): string {
        return this._userID;
    }

    get userAuthentificated() {
        return this._userAuthentificated;
    }

    private _isServeur = false;

    get isServeur(): boolean {
        return this._isServeur;
    }

    private _isClient = false;

    get isClient(): boolean {
        return this._isClient;
    }

    set isClient(value: boolean) {
        this._isClient = value;
    }

    async registre(user: User) {

        try {

            const rest = await this.auth.auth.createUserWithEmailAndPassword(user.email, user.password).then(cred => {
                try {

                    if (user.isServeur
                    ) {
                        this.db.collection('users').doc(cred.user.uid).set({
                            nom: user.fullName,
                            email: user.email,
                            telephone: user.telephone,
                            motdepasse: user.password,
                            role: 'prestataire'
                        });
                        this.db.collection('service').doc(cred.user.uid).set({
                            profession: user.profession,
                            gouvernement: user.gouvernement,
                            ville: user.ville,
                            adresse: user.adresse
                        })
                        ;
                        this.db.collection('contraintes').doc(cred.user.uid).set({
                            nbPrestations: 8,
                            heureDebut: 8,
                            heureFin: 13,
                            dureePrestation: 60
                        })
                        ;
                        this.altr.create({
                            header: 'Registre prestataire',
                            message: 'Registre réussi comme prestataire',
                            buttons: ['okay']
                        }).then(alter => alter.present());
                    } else {
                        this.db.collection('users').doc(cred.user.uid).set({
                            nom: user.fullName,
                            email: user.email,
                            telephone: user.telephone,
                            motdepasse: user.password,
                            role: 'client'
                        });
                        this.altr.create({
                            header: 'Registre Client',
                            message: 'Registre réussi comme client',
                            buttons: ['okay']
                        }).then(alter => alter.present());
                    }

                } catch (e) {
                    this.showAlert(e.message);


                }

            });

        } catch (e) {
            this.showAlert(e.message);

        }

    }

    async login(mail: string, password: string) {
        try {
            const res = await this.auth.auth.signInWithEmailAndPassword(mail, password);
            if (res) {
                this._userAuthentificated = true;
                this._userID = res.user.uid;
                this.data.loadProfile(this._userID).subscribe(ress => {
                    this.p = ress;
                    if (this.p.role === 'prestataire') {
                        this.router.navigate(['prestataire']);
                        this._isServeur = true;
                    } else {
                        this.router.navigate(['client']);
                        this._isClient = true;
                    }
                });
            }
        } catch (err) {
            this.showAlert(err.message);

        }


    }

    logout() {
        this._userAuthentificated = false;
        this.isClient = false;
        this.isServeur = false;
        this.auth.auth.signOut().then(() => {
            this.router.navigateByUrl('/');
        });

    }

    private showAlert(message: string) {
        this.altr.create({header: 'Authentification échouée', message: message, buttons: ['okay']}).then(alter => alter.present());
    }
}
