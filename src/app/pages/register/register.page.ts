import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../interfaces/user';
import {Service} from '../../interfaces/service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public onRegisterForm: FormGroup;
    public serve: false;
    public user: User;
    public service: Service;
    public adresse: string;
    public profession: any[];
    public sproffession: string;
    // la localisation
    public states: any[];
    public districts: any[];

    public selectedDistricts: any[];

    public sState: any;
    public sDistrict: any;
    public sDis: any;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        private auth: AuthService
    ) {
        this.initializeState();
        this.initializeDistrict();
        this.initializeProffession();
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    initializeProffession() {
        this.profession = ['Carcinologue',
            'Neurologue',
            'Orthopédiste',
            'Gynécologue',
            'Urologue',
            'ORL',
            'Cardiologue',
            'Dentiste',
            'Médecin généraliste',
            'Néphrologue',
            'Ophtalmologue',
            'Pédiatre',
            'Pneumologue',
            'Psychiatre',
            'Radiologue',
            'Rhumatologue',
            'Sexologue',
            'Toxicologue',
            'Vétérinaire',
            'Dermatologue',
            'Virologue',
            'Vnérologue',
            'Toxicologue',
            'Addictologue'].sort()
        ;
    }

    initializeState() {
        this.states = [
            {id: 1, name: 'Ariana'},
            {id: 2, name: 'Beja'},
            {id: 3, name: 'Ben Arous'},
            {id: 4, name: 'Bizerte'},
            {id: 5, name: 'Gabes'},
            {id: 6, name: 'Gafsa'},
            {id: 7, name: 'Jendouba'},
            {id: 8, name: 'Kairaouan'},
            {id: 9, name: 'Kasserine'},
            {id: 10, name: 'kebeli'},
            {id: 11, name: 'kef'},
            {id: 12, name: 'mahdia'}, {id: 13, name: 'mannouba'}, {id: 14, name: 'mednine'},
            {id: 15, name: 'Monastir'}, {id: 16, name: 'Nabile'}, {id: 17, name: 'sfax'}, {id: 18, name: 'Sidi Bouzid'},
            {id: 19, name: 'Siliana'}, {id: 20, name: 'Sousse'}, {id: 21, name: 'Tataouine'}, {id: 22, name: 'Tozeur'},
            {id: 23, name: 'Tunis'}, {id: 24, name: 'Zaghouane'},

        ].sort();
    }

    initializeDistrict() {
        this.districts = [
            {
                name: [

                    ' Ettadhamen Mnihla ', 'La Soukra ', 'Ariana ', 'Raoued ',
                    'Kalaat e lAndalous ', ' S i d i Thabet '], state_id: 1
            },
            {
                name: [
                    ' Beja ', 'Medjez e lBab',
                    'Tes tour ', 'Teboursouk ', 'El Maagoula ', 'Nefza ', 'Amdoun',
                    'Goubellat ', 'Thibar '], state_id: 2
            }, {
                name: [
                    ' Ezzahra ', 'Hammam Chott ', 'Mornag ',
                    'Megrine ', 'Khalidia ', 'BouMhel e lBassatine ', 'Hammam Linf ',
                    'Rades ', 'Ben Arous ', 'El Mourouj ', 'MohamediaFouchana '], state_id: 3
            },
            {
                name: [
                    ' Bizerte ', 'Menzel Bourguiba ', 'Mateur ', 'RasJebe l ', 'Menzel Jemi l ',
                    'Tinja ', 'Menzel Abderrahmane ', 'ElAl ia ', 'Metline ', ' Sejnane ',
                    'Ghar El Melh ', 'Aousja ', 'Ghezala ', 'Joumine ', 'Utique ', 'Raf Raf '], state_id: 4
            },
            {
                name: [
                    'Gabes ', 'El Hamma', 'Ghannouch ', 'Chenini Nahal ', 'Mareth ', 'Metouia ',
                    'Oudhref ', 'Nouvelle Matmata ', 'AZ-Zarat', 'Matmata ', 'Menzel El Habib '], state_id: 5
            },
            {
                name: [
                    'Gafsa ', 'Met laoui ', 'El Ksar ', 'Redeyef ', 'Moulares ', 'El Guettar ',
                    'Mdhilla ', 'Sened ', ' Belkhir ', ' Sidi Aich '], state_id: 6
            }, {
                name: [
                    ' Jendouba ', 'BouSalem',
                    'Tabarka ', 'Ghardimaou ', 'Ain Draham', 'Fernana ', 'Oued Mel iz ', 'BeniMTir'], state_id: 7
            }, {
                name: [
                    'Kairouan ', 'Hajeb El Ayoun', 'Oueslatia ', 'Haffouz ',
                    ' Sbikha ', 'Bou Haj la ', 'Na s r a l l ah ', 'Menzel Mehi r i ', 'El Alaa ',
                    'Chebika ', 'Ain Djeloul a ', 'Echrarda '], state_id: 8
            }, {
                name: [
                    ' Kasserine ', 'Feriana ',
                    ' S b e i t l a ', 'Thala ', 'Foussana ', 'Thelepte ', ' Sbiba ', 'Majel Bel Abbes ',
                    ' J ede l i enne ', 'Haidra ', 'El Ayoun', 'Ezzouhour ', 'Has s i El Fe r id '], state_id: 9
            },
            {
                name: [
                    'Douz ', 'KebJMenuItem miEn r e g i s t r e r S o u s i l i ', 'Souk Lahad ', 'El Golaa ',
                    'Jemna ', 'Faouar '], state_id: 10
            }, {
                name: [
                    'Le Kef ', 'Tajerouine ', 'Dahmani ', ' Sers', ' Jerissa ',
                    'Kalaat Senan ', ' Sakiet Sidi Youssef ', 'El Ksour ', 'Nebeur ',
                    'Kalaat Khasba ', 'Touiref ', 'Menzel Salem'], state_id: 11
            }, {
                name: [
                    'Mahdia ', 'Ksour Es s e f ',
                    'Chebba ', 'El Jem', 'Rejiche ', ' Sidi Alouane ', 'Kerker ', 'El Bradaa ',
                    'Mellouleche ', 'Chorbane ', ' Essouassi ', 'Ouled Chamekh', 'Zelba ',
                    ' Tlelsa ', ' Sidi Zid ', 'Hkaima ', 'Hebi ra ', 'Bou Merdes '], state_id: 12
            }, {
                name: [
                    'Douar Hicher ',
                    'Oued E l l i l ', 'La Manouba', 'Djedeida ', 'Tebourba ', 'Den Den',
                    'Mornaguia ', 'Borj El Amri ', 'El Batan '], state_id: 13
            }, {
                name: [
                    ' Djerba Houmt Souk ',
                    ' Zarzis ', 'Medenine ', 'Ben Gardane ', 'Djerba Midoun ', 'Djerba Ajim',
                    ' Sidi Makhlouf ', 'Beni Khedache '], state_id: 14
            }, {
                name: [
                    'Monastir ', 'Moknine ', 'Jemmal ',
                    'Ksar Hellal ', 'Teboulba ', 'Ouerdanine ', ' Sahline Mootmar ', 'Bekal ta ',
                    'Zeramdine ', 'Bembla ', 'Bennane􀀀Bodheur ', 'Ksibet e lMediouni ',
                    'Sayada ', 'Menzel Hayet ', 'Menzel Ennour ', 'Khniss ', 'Beni Hassen ',
                    'Menzel Kamel ', ' Sidi Ameur', 'Amiret Hajjaj ', 'Touza ', 'Bouhjar ',
                    ' Zaouiet Kontoch ', 'Amiret Touazra ', 'Lamta ', 'Amiret El Fhoul ',
                    'El Ghnada ', 'El Masdour ', ' S i d i Bennour ', 'Che rahi l ', 'Menzel Fersi '], state_id: 15
            },
            {
                name: [
                    'Hammamet', 'Nabeul ', 'Kelibia ', 'Dar Chaabane ', 'Menzel Temime',
                    'Korba ', 'Sol iman ', 'Grombalia ', ' Takelsa ', ' Beni Khiar ', 'Menzel Bouzelfa ',
                    'Beni Khal led ', 'Bou Argoub ', 'El Haouaria ', 'Tazarka ', 'Hammam Ghezeze ',
                    'El Maamoura', ' Zaoui e t Dj edidi ', 'Somaa', 'Menzel Horr ', 'Azmour',
                    'Dar Al louch ', 'El Mida ', 'Korbous '], state_id: 16
            }, {
                name: [
                    ' Sfax ', ' Sakiet Ezzit ', 'El Ain ',
                    ' Sakiet Eddaier ', 'Gremda', 'Thyna ', 'Chihia ', 'Mahres ', 'Kerkennah ',
                    ' Skhi ra ', 'Agareb ', 'El Hencha ', ' Jebiniana ', 'BirAli Ben Khalifa ',
                    'Graiba ', 'Menzel Chaker ', 'El Amra', 'Aachech ', 'Ennasr ', 'Hadjeb ',
                    'Hazeg El louza ', 'Nadhour Sidi Ali Ben Abed', 'Ouabed Khazanet '], state_id: 17
            },
            {
                name: [
                    ' Sidi Bouzid ', 'Meknassy ', 'Regueb ', ' Sidi Ali Ben Aoun', 'Mezzouna ',
                    'Menzel Bouzaiane ', 'Bir El Hafey ', ' Jilma ', 'Cebbala Ouled Asker ',
                    'Ouled Haffouz ', 'Essaida ', 'Souk Jedid '], state_id: 18
            }, {
                name: [
                    ' Siliana ', 'Makthar ',
                    'Bou Arada ', 'Gaafour ', 'El Krib ', 'Bargou ', 'Rouhia ', ' S i d i Bou Rouis ',
                    'El Aroussa ', 'Kesra '], state_id: 19
            }, {
                name: [
                    ' Sousse ', 'Msaken ', 'Kalaa Kebira ', 'Akouda ',
                    'Hammam Sousse ', 'Kalaa Seghira ', ' Zaouiet Sousse ', 'Ezzouhour ',
                    'Messaadine ', 'Ksibet Thrayet ', 'Enfida ', ' Sidi Bou Ali ', 'Bouf icha ',
                    'Hergla ', 'Kondar ', ' Sidi El Hani '], state_id: 20
            }, {
                name: [
                    ' Tataouine ', 'Ghomrassen ', 'Remada',
                    'Bi r Lahmar ', 'Dehiba ', 'Smar '], state_id: 21
            }, {
                name: [
                    ' Tozeur ', 'Nef ta ', 'Degache ', 'Tamerza ',
                    'El Hamma du Jerid ', 'Hazoua '], state_id: 22
            }, {
                name: [
                    ' Tunis ', ' Sidi Hassine ', 'La Marsa ',
                    'Le Kram', 'Le Bardo ', 'La Goulette ', 'Carthage ', ' Sidi Bou Said '], state_id: 23
            },
            {
                name: [
                    'ElFahs ', ' Zaghouan ', ' Zriba ', ' Bir Mcherga ', 'Nadhour ', ' Djebe l Oust ',
                    ' Saouaf '], state_id: 24
            }

        ].sort()
        ;
    }

    setDistrictValues(sState) {
        this.selectedDistricts = this.districts.filter(district => district.state_id === sState.id);
        this.sDis = this.selectedDistricts[0][Object.keys(this.selectedDistricts[0])[0]];
        if (this.sDis.length > 0) {
            this.sDis.sort();
        }
    }

    ngOnInit() {
        this.onRegisterForm = this.formBuilder.group({
            'fullName': [null, Validators.compose([
                Validators.required
            ])],
            'email': [null, Validators.compose([
                Validators.required, Validators.email
            ])],
            'telephone': [null, Validators.compose([
                Validators.required, Validators.minLength(8)
            ])]
            ,
            'password': [null, Validators.compose([
                Validators.required, Validators.minLength(6)
            ])]
        });
    }

    async signUp() {


        if (this.onRegisterForm.valid) {
            this.user = this.onRegisterForm.value;
            this.user.telephone = +this.onRegisterForm.value['telephone'];
            this.user.isClient = true;
            if (this.serve) {
                this.user.isServeur = true;
                this.user.gouvernement = this.sState.name;
                this.user.ville = this.sDistrict;
                this.user.adresse = this.adresse;
                this.user.profession = this.sproffession;
            } else {
                this.user.isServeur = false;
            }
            console.log(this.user.isClient);
            console.log(this.user);

        } else {
            console.log('erreur');
        }

        const loader = await this.loadingCtrl.create({
            message: 'stanna chway ...'
        });
        await loader.present();
        this.auth.registre(this.user).then(() => {
            loader.dismiss();
        });
        this.goToLogin();
    }

    // // //
    goToLogin() {
        this.navCtrl.navigateRoot('/');
    }
}
