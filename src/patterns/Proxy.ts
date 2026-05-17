import type { IUser } from './interfaces/user.interface.js';
import { ControlOfReservation, type Reservation } from './Reserve.js';

export class ReservationAccessProxy {
	private currentUser: IUser | undefined;
	private loginAttempts: Map<string, number> = new Map();
	private readonly MAX_LOGIN_ATTEMPTS = 3;

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
		if (!user) {
			const attempts = this.loginAttempts.get(normalizedEmail) ?? 0;
			const newAttempts = attempts + 1;
			this.loginAttempts.set(normalizedEmail, newAttempts);
			if (newAttempts >= this.MAX_LOGIN_ATTEMPTS) {
				throw new Error('Conta bloqueada: número máximo de tentativas excedido.');
			}
			return undefined;
		}

		this.currentUser = user;
		this.loginAttempts.delete(normalizedEmail);
		return user;
	}

	attemptsLeft(email: string): number {
		const normalized = email.trim();
		const attempts = this.loginAttempts.get(normalized) ?? 0;
		return Math.max(0, this.MAX_LOGIN_ATTEMPTS - attempts);
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

		return [];
	}
}
