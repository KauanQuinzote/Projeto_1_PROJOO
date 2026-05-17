export class ReservationAccessProxy {
    control;
    currentUser;
    loginAttempts = new Map();
    MAX_LOGIN_ATTEMPTS = 3;
    constructor(control) {
        this.control = control;
    }
    getLoggedUser() {
        return this.currentUser;
    }
    login(email, password) {
        const normalizedEmail = email.trim();
        const normalizedPassword = password;
        const user = this.control.users.find(u => u.email === normalizedEmail && u.password === normalizedPassword);
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
    attemptsLeft(email) {
        const normalized = email.trim();
        const attempts = this.loginAttempts.get(normalized) ?? 0;
        return Math.max(0, this.MAX_LOGIN_ATTEMPTS - attempts);
    }
    logout() {
        this.currentUser = undefined;
    }
    listReservations() {
        if (!this.currentUser) {
            throw new Error('Acesso negado: usuário não autenticado.');
        }
        if (this.currentUser.role === 'Professor') {
            return this.control.reservations;
        }
        if (this.currentUser.role === 'Student') {
            return this.control.reservations.filter(r => r.userId === this.currentUser.id);
        }
        // Caso surja um novo role no futuro.
        return [];
    }
}
//# sourceMappingURL=Proxy.js.map