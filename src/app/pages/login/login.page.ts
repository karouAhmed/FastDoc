import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public onLoginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    ngOnInit() {

        this.onLoginForm = this.formBuilder.group({
            'email': [null, Validators.compose([
                Validators.required
            ])],
            'password': [null, Validators.compose([
                Validators.required, Validators.min(6)
            ])]
        });
    }

    async forgotPass() {
        const alert = await this.alertCtrl.create({
            header: 'Mot de passe oublié?',
            message: 'Entrez votre adresse email pour envoyer un mot de passe pour le lien de réinitialisation.',
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Confirm',
                    handler: async () => {
                        const loader = await this.loadingCtrl.create({
                            duration: 2000
                        });

                        loader.present();
                        loader.onWillDismiss().then(async l => {
                            const toast = await this.toastCtrl.create({
                                showCloseButton: true,
                                message: 'Email a été envoyé avec succès.',
                                duration: 3000,
                                position: 'bottom'
                            });

                            toast.present();
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    // // //
    goToRegister() {
        this.navCtrl.navigateRoot('/register');
    }

    async Login() {
        const loader = await this.loadingCtrl.create({
            message: 'Verification ...'
        });
        await loader.present();
        this.authService.login(this.onLoginForm.value.valueOf().email, this.onLoginForm.value.valueOf().password).then(() => {
            loader.dismiss();
        });
    }

}
