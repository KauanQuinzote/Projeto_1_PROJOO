import { IReservation } from "./interfaces/reservation.interface.js";
import { Reservation , ConflitoAgenda } from "./Reserve.js"; 

export interface Strategy {
    execute(user: any, room: any, startTime: Date, endTime: Date, reservations: IReservation[]):Reservation | undefined;
}

export class ReservaPrioritaria implements Strategy{
    execute(user: any, room: any, startTime: Date, endTime: Date, reservations: IReservation[]){
        return undefined;
    }
}

export class ReservaNormal implements Strategy{

    execute(user: any, room: any, startTime: Date, endTime: Date, reservations: IReservation[]){
        //verificar se o quarto já está reservado para o período solicitado
        const conflito = reservations.some(reservation => reservation!.room!.id === room.id && ConflitoAgenda(reservation.startTime, reservation.endTime, startTime, endTime));
        //elee sempre compara o mesmo quarto, e verifica se há conflito de horário usando a função ConflitoAgenda
        //nao esta muito eficinte, mas eh o quee temos por enquanto, pode ser melhorado futuramente usando um sistema de indexação ou banco de dados
        
        if (conflito) { //se houver conflito, a reserva não pode ser feita
            console.log("A Sala já está reservada para o período solicitado.");
            return undefined;
        }
        const NovaReserva = new Reservation(user.id, room.id, startTime, endTime, user, room);

        return NovaReserva;
    }
}