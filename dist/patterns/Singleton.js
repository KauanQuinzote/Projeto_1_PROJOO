export class Gerenciamento {
    static instance;
    NReservation;
    NUser;
    NRoom;
    constructor() {
        this.NReservation = 0;
        this.NUser = 0;
        this.NRoom = 0;
    }
    get nReservation() {
        return this.NReservation;
    }
    get nUser() {
        return this.NUser;
    }
    static getInstance() {
        if (!Gerenciamento.instance) {
            Gerenciamento.instance = new Gerenciamento();
        }
        return Gerenciamento.instance;
    }
}
//# sourceMappingURL=Singleton.js.map