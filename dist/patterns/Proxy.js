export class ReservationAccessProxy {
    control;
    currentUser;
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
        if (!user)
            return undefined;
        this.currentUser = user;
        return user;
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