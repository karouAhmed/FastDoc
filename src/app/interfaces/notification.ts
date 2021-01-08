export interface Notification {
    userID: string;
    contenu: {
        message: string;
        expéditeur: string
    };
    date: any;
    Vu: boolean;
}
