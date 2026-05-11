

export class Gerenciamento {
    private static instance: Gerenciamento;

    private NReservation: number;
    private NUser: number;
    
    private constructor () {  
        this.NReservation =  0;
        this.NUser = 0;
    }
    
    get nReservation (): number {
        return this.NReservation;
    }

    get nUser (): number {
        return this.NUser;
    }

    public static getInstance (): Gerenciamento {
        if (!Gerenciamento.instance) {
            Gerenciamento.instance = new Gerenciamento();
        }
        return Gerenciamento.instance;
    }
}