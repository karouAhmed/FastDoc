import {Component} from '@angular/core';
import {AlertController, LoadingController, MenuController} from '@ionic/angular';
import {SearchService} from '../../services/search/search.service';
import {Critere} from '../../interfaces/critere';
import {ContraintService} from '../../services/contraint/contraint.service';
import {CalendarService} from '../../services/calendar/calendar.service';
import {Contraintes} from '../../interfaces/contraintes';
import {Rdv} from '../../interfaces/rdv';
import {Step} from '../../interfaces/step';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-recherche',
    templateUrl: './recherche.page.html',
    styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage {

    CopyServices: any[];

    public states: any[];
    public districts: any[];

    public selectedDistricts: any[];
    public profession: any[];
    public sproffession: string;
    public sState: any;
    public sDistrict: any;
    public sDis: any;
    starTime: '';
    endTime: '';
    // Pour la recherche
    public critere: Critere;
    services: any[];
    private userID: string;

    constructor(public menuCtrl: MenuController,
                private searchService: SearchService,
                private loadingCtrl: LoadingController,
                private containtesData: ContraintService,
                private rdvService: CalendarService,
                private router: Router,
                private altr: AlertController,
                private authService: AuthService
    ) {
        this.userID = authService.userID;
        this.initializeProffession();
        this.initializeState();
        this.initializeDistrict();
    }

    disponible: any[] = [];
    rdvs: Rdv[];
    contraintes: Contraintes;
    steps: Step[] = [];
    public showresultat = false;
    isLoading = false;
    private deleted: boolean;

    ionViewDidLeave() {
        this.showresultat = false;
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
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

    debut(date: Date) {
        date.setSeconds(0);
        date.setMilliseconds(0);
        date.setMinutes(0);
        date.setHours(0);
        return date;
    }

    fin(date: Date) {
        date.setMinutes(59);
        date.setHours(23);
        return date;
    }

    async search() {

        this.isLoading = true;
        this.showresultat = true;
        if (this.disponible) {
            this.disponible.splice(0, this.disponible.length);
        }
        if (this.services) {
            this.services.splice(0, this.services.length);
        }
        this.critere = {
            proffession: this.sproffession,
            ville: this.sDistrict,
            gouvernement: this.sState.name,
            starTime: this.starTime,
            endTime: this.endTime
        };

        const loader = await this.loadingCtrl.create({
            message: 'stanna chway ...'
        });
        loader.present();
        await this.searchService.searchService(this.critere).subscribe(res => {
            if (res.length === 0) {
                loader.dismiss();
                this.isLoading = false;
            } else {
                this.services = res;
                this.CopyServices = this.services;
                let length = this.services.length;
                this.services.forEach(async ser => {
                    length--;
                    await this.containtesData.loadConstraintsById(ser.id).subscribe(async con => {
                        this.contraintes = con;
                        const cs = this.contraintes;
                        const debut = new Date(this.critere.starTime);
                        const fin = new Date(this.critere.endTime);
                        if ((this.contraintes.heureFin <= debut.getHours()) || (this.contraintes.heureDebut >= fin.getHours())) {
                            this.services = this.services.filter(se => se.id !== ser.id);
                            this.CopyServices = this.CopyServices.filter(Cs => Cs.id !== ser.id);
                            if (length === 0) {
                                this.isLoading = false;
                            }
                        } else {
                            this.fin(fin);
                            this.debut(debut);
                            await this.rdvService.getAppointmentById(ser.id, debut, fin).subscribe(rdvss => {
                                    this.rdvs = rdvss;
                                    if (this.rdvs.length >= this.contraintes.nbPrestations) {
                                        this.services = this.services.filter(se => se.id !== ser.id);
                                        this.rdvs.splice(0, this.rdvs.length);
                                        if (length === 0) {
                                            this.isLoading = false;
                                        }
                                    } else {
                                        this.deleted = false;
                                        this.rdvs.forEach(rv => {
                                            rv.startTime = rv.startTime.toDate();
                                            rv.endTime = rv.endTime.toDate();
                                        });
                                        const hd = new Date(this.critere.starTime);
                                        const hf = new Date(this.critere.endTime);
                                        hd.setSeconds(0);
                                        hd.setMilliseconds(0);
                                        hf.setMilliseconds(0);
                                        hf.setSeconds(0);
                                        this.rdvs.some(ev => {
                                            if ((ev.startTime.getTime() === hd.getTime()) && (ev.endTime.getTime() === hf.getTime())) {
                                                this.services = this.services.filter(se => se.id !== ser.id);
                                                this.rdvs.splice(0, this.rdvs.length);
                                                if (length === 0) {
                                                    this.isLoading = false;
                                                }
                                                this.deleted = true;
                                                return true;
                                            }
                                        });
                                        if (!this.deleted) {

                                            if (hd.getHours() < cs.heureDebut) {
                                                this.partitioning(hd.setHours(cs.heureDebut), hf, this.contraintes.dureePrestation);
                                            } else if (hf.getHours() > cs.heureFin) {
                                                hf.setHours(cs.heureFin);
                                                this.partitioning(hd, hf, cs.dureePrestation);
                                            } else {
                                                this.partitioning(hd, hf, cs.dureePrestation);
                                            }
                                            this.rdvs.forEach(rdv => {
                                                // tslint:disable-next-line:max-line-length
                                                this.steps = this.steps.filter(stp => (stp.startTime.getTime() !== rdv.startTime.getTime()) && (stp.endTime.getTime() !== rdv.endTime.getTime()));
                                            });
                                            if (this.steps.length > 0) {
                                                const copy = this.steps.slice();
                                                this.disponible.push({service: ser, horaires: copy});
                                                this.rdvs.splice(0, this.rdvs.length);
                                                this.isLoading = false;
                                                this.deleted = true;
                                            } else {
                                                this.services = this.services.filter(se => se.id !== ser.id);
                                                this.rdvs.splice(0, this.rdvs.length);
                                                this.deleted = true;
                                            }

                                        }


                                    }
                                }
                            );
                        }
                    });

                });

                loader.dismiss();

            }

        });
    }


    partitioning(debut, fin, st: number) {
        this.steps.splice(0, this.steps.length);
        let d = new Date(debut);
        const i = new Date(debut);
        let copy;
        while (i.getTime() < fin.getTime()) {
            i.setMinutes(i.getMinutes() + st);
            copy = {
                startTime: new Date(d),
                endTime: new Date(i)
            };
            this.steps.push(copy);
            d = new Date(i);
        }

    }

    checkProfile(plage, service) {
        let data;
        data = {
            id: service.id,
            profession: service.profession,
            gouvernement: service.gouvernement,
            ville: service.ville,
            adresse: service.adresse,
            startTime: new Date(plage.startTime),
            endTime: new Date(plage.endTime)

        };
        this.router.navigate(['client', 'recherche', 'profil'], {queryParams: {value: JSON.stringify(data)}});
    }

    async subscribe() {
        const loader = await this.loadingCtrl.create({
            translucent: true
        });
        loader.present();
        if (!this.CopyServices || this.CopyServices.length === 0) {
            loader.dismiss().then(() => {
                this.showAlert('Pas des Rendez-vous pour abonner', 'Abonnement échouer');
            });
        } else {
            const debut = new Date(this.critere.starTime);
            const fin = new Date(this.critere.endTime);
            debut.setSeconds(0);
            debut.setMilliseconds(0);
            fin.setSeconds(0);
            fin.setMilliseconds(0);
            let rdvsRef: any[];
            this.CopyServices.forEach(prestataire => {
                this.rdvService.getAppointmentRef(prestataire.id, debut, fin).subscribe(res => {
                    if (res) {
                        rdvsRef = res;
                        rdvsRef.forEach(rdvID => {
                            this.rdvService.updateAppointment(prestataire.id, rdvID.id, this.userID).then(() => {
                                loader.dismiss().then(() => {
                                    this.showAlert('Vous serez notifier en cas de trouver un rendez-vous', 'Abonnement réussit');
                                });
                            });
                        });
                    } else {
                        console.log('pas des rendez pour abonne');
                    }
                });
            });

        }
    }

    private showAlert(message: string, header: string) {
        return this.altr.create({
            header: header, message: message, buttons: [{
                text: 'Okey', handler: () => {
                    this.showresultat = false;
                }
            }]
        }).then(alter => alter.present());
    }
}

