import { Gerenciamento } from "./Singleton.js";
export class Professor {
    id;
    name;
    email;
    password;
    role = 'Professor';
    createdAt;
    updatedAt;
    constructor(name, email, password) {
        this.id = this.id = Gerenciamento.getInstance().NUser++;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    update(roomId, roomType, reserved) {
        const status = reserved ? 'RESERVADA' : 'DISPONÍVEL';
        console.log(`[Professor ${this.name}] Notificação: Sala ${roomId} (${roomType}) está ${status}`);
    }
}
export class Student {
    id;
    name;
    email;
    password;
    role = 'Student';
    createdAt;
    updatedAt;
    constructor(name, email, password) {
        this.id = this.id = Gerenciamento.getInstance().NUser++;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    update(roomId, roomType, reserved) {
        const status = reserved ? 'RESERVADA' : 'DISPONÍVEL';
        console.log(`[Aluno ${this.name}] Notificação: Sala ${roomId} (${roomType}) está ${status}`);
    }
}
//# sourceMappingURL=Users.js.map