

export class Gerenciamento {
    private static instance: Gerenciamento;

    public NReservation: number;
    public NUser: number;
    public NRoom: number;
    
    private constructor () {  
        this.NReservation =  0;
        this.NUser = 0;
        this.NRoom = 0;
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