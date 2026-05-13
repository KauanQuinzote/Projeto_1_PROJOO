import type { IUser } from './interfaces/user.interface.js';
import { ControlOfReservation, type Reservation } from './Reserve.js';

export class ReservationAccessProxy {
	private currentUser: IUser | undefined;

	constructor(private readonly control: ControlOfReservation) {}

	getLoggedUser(): IUser | undefined {
		return this.currentUser;
	}

	login(email: string, password: string): IUser | undefined {
		const normalizedEmail = email.trim();
		const normalizedPassword = password;

		const user = this.control.users.find(
			u => u.email === normalizedEmail && u.password === normalizedPassword,
		);

		if (!user) return undefined;
		this.currentUser = user;
		return user;
	}

	logout(): void {
		this.currentUser = undefined;
	}

	listReservations(): Reservation[] {
		if (!this.currentUser) {
			throw new Error('Acesso negado: usuário não autenticado.');
		}

		if (this.currentUser.role === 'Professor') {
			return this.control.reservations;
		}

		if (this.currentUser.role === 'Student') {
			return this.control.reservations.filter(r => r.userId === this.currentUser!.id);
		}

		// Caso surja um novo role no futuro.
		return [];
	}
}
