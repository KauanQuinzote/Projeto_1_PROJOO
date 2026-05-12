import { Reservation, ConflitoAgenda } from "./Reserve.js";
export class ReservaPrioritaria {
    execute(user, room, startTime, endTime, reservations) {
        const conflito = reservations.some(reservation => reservation.room.id === room.id && ConflitoAgenda(reservation.startTime, endTime, startTime, reservation.endTime));
        var NovaReserva = undefined;
        if (conflito) {
            //encontrar a reserva que está em conflito
            const reservaConflito = reservations.find(reservation => reservation.room.id === room.id && ConflitoAgenda(reservation.startTime, endTime, startTime, reservation.endTime));
            if (reservaConflito) {
                //cancelar a reserva em conflito
                reservations.splice(reservations.indexOf(reservaConflito), 1);
                console.log(`Reserva ${reservaConflito.id} cancelada para dar prioridade a nova reserva`);
            }
            NovaReserva = new Reservation(user.id, room.id, startTime, endTime, user, room);
        }
        NovaReserva = new Reservation(user.id, room.id, startTime, endTime, user, room);
        return NovaReserva;
    }
}
export class ReservaNormal {
    execute(user, room, startTime, endTime, reservations) {
        //verificar se o quarto já está reservado para o período solicitado
        const conflito = reservations.some(reservation => reservation.room.id === room.id && ConflitoAgenda(reservation.startTime, endTime, startTime, reservation.endTime));
        //elee sempre compara o mesmo quarto, e verifica se há conflito de horário usando a função ConflitoAgenda
        //nao esta muito eficinte, mas eh o quee temos por enquanto, pode ser melhorado futuramente usando um sistema de indexação ou banco de dados
        if (conflito) { //se houver conflito, a reserva não pode ser feita
            return undefined;
        }
        const NovaReserva = new Reservation(user.id, room.id, startTime, endTime, user, room);
        return NovaReserva;
    }
}
//# sourceMappingURL=Strategy.js.map