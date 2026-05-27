import { ControlOfReservation } from './dist/patterns/Reserve.js';
import { Professor } from './dist/patterns/Users.js';
import { ReservationAccessProxy } from './dist/patterns/Proxy.js';

const control = new ControlOfReservation();
const user = new Professor('Teste','teste1','123');
control.users.push(user);
const proxy = new ReservationAccessProxy(control);

function tryLogin(email, pass, label) {
  try {
    const u = proxy.login(email, pass);
    console.log(`${label}: login retornou`, u ? `user ${u.name}` : 'indefinido');
  } catch (e) {
    console.log(`${label}: threw ->`, e instanceof Error ? e.message : String(e));
  }
}

tryLogin('teste1', 'wrong1', 'Attempt 1');
tryLogin('teste1', 'wrong2', 'Attempt 2');
tryLogin('teste1', 'wrong3', 'Attempt 3');
tryLogin('teste1', '123', 'Attempt 4 (correct)');
