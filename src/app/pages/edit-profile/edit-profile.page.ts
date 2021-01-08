import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {Profil} from '../../interfaces/profil';
import {ProfilService} from '../../services/profil/profil.service';
import {AuthService} from '../../services/auth/auth.service';


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.page.html',
    styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
    profil: Profil;
    nom: string;
    email: string;
    telephone: number;
    private userID: string;
    password: string;
    CopyPassword = '';

    constructor(
        public loadingCtrl: LoadingController,
        private data: ProfilService,
        private authService: AuthService
    ) {
        this.userID = authService.userID;
    }

    ngOnInit() {
        this.data.loadProfile(this.userID).subscribe(res => {
            this.profil = res;
            this.nom = this.profil.nom;
            this.email = this.profil.email;
            this.telephone = this.profil.telephone;
            this.password = this.profil.motdepasse;
        });
    }

    async update() {
        this.profil.nom = this.nom;
        this.profil.telephone = +this.telephone;
        this.profil.email = this.email;

        const loader = await this.loadingCtrl.create({
            message: 'Mise à jour ...'
        });

        loader.present();
        this.data.updateProfile(this.profil, this.userID).then(async () => {
            loader.dismiss();
        });

    }

}
