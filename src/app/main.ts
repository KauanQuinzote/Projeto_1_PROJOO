
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { ControlOfReservation } from '../patterns/Reserve.js';
import { Professor, Student } from '../patterns/Users.js';
import { RoomFactory } from '../patterns/Factory.js';
import { CoffeeAreaRoom, CleaningServiceRoom, ProjectorRoom } from '../patterns/Decorator.js';
import type { RoomType } from '../patterns/interfaces/room.interface.js';

function normalizeChoice(raw: string): string {
	return raw.trim();
}

function parseLocalDateTime(raw: string): Date | undefined {
	const match = /^\s*(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})\s*$/.exec(raw);
	if (!match) return undefined;

	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	const hour = Number(match[4]);
	const minute = Number(match[5]);

	if (
		!Number.isInteger(year) ||
		!Number.isInteger(month) ||
		!Number.isInteger(day) ||
		!Number.isInteger(hour) ||
		!Number.isInteger(minute)
	) {
		return undefined;
	}

	if (month < 1 || month > 12) return undefined;
	if (day < 1 || day > 31) return undefined;
	if (hour < 0 || hour > 23) return undefined;
	if (minute < 0 || minute > 59) return undefined;

	const date = new Date(year, month - 1, day, hour, minute, 0, 0);
	if (Number.isNaN(date.getTime())) return undefined;
	return date;
}

function pad2(n: number): string {
	return String(n).padStart(2, '0');
}

function formatLocalDateTime(date: Date): string {
	const y = date.getFullYear();
	const m = pad2(date.getMonth() + 1);
	const d = pad2(date.getDate());
	const hh = pad2(date.getHours());
	const mm = pad2(date.getMinutes());
	return `${y}-${m}-${d} ${hh}:${mm}`;
}

function ceilToNextMinutes(date: Date, stepMinutes: number): Date {
	const ms = date.getTime();
	const stepMs = stepMinutes * 60_000;
	const ceiled = Math.ceil(ms / stepMs) * stepMs;
	return new Date(ceiled);
}

function buildSuggestedSlots(now = new Date()): Array<{ start: Date; end: Date }> {
	// Sugestões: 3 slots de 1h, a partir do próximo bloco de 30min.
	const start1 = ceilToNextMinutes(now, 30);
	const slots: Array<{ start: Date; end: Date }> = [];
	for (let i = 0; i < 3; i++) {
		const start = new Date(start1.getTime() + i * 60 * 60_000);
		const end = new Date(start.getTime() + 60 * 60_000);
		slots.push({ start, end });
	}
	return slots;
}

async function askNonEmpty(rl: ReturnType<typeof createInterface>, prompt: string): Promise<string> {
	while (true) {
		const value = (await rl.question(prompt)).trim();
		if (value.length > 0) return value;
		console.log('Entrada inválida. Tente novamente.');
	}
}

async function askChoice(
	rl: ReturnType<typeof createInterface>,
	prompt: string,
	allowed: readonly string[],
): Promise<string> {
	while (true) {
		const choice = normalizeChoice(await rl.question(prompt));
		if (allowed.includes(choice)) return choice;
		console.log('Opção inválida. Tente novamente.');
	}
}

async function askNumber(rl: ReturnType<typeof createInterface>, prompt: string): Promise<number> {
	while (true) {
		const raw = (await rl.question(prompt)).trim();
		const value = Number(raw);
		if (Number.isInteger(value) && value >= 0) return value;
		console.log('Número inválido. Tente novamente.');
	}
}

async function askDateTime(
	rl: ReturnType<typeof createInterface>,
	prompt: string,
): Promise<Date> {
	while (true) {
		const raw = await rl.question(prompt);
		const parsed = parseLocalDateTime(raw);
		if (parsed) return parsed;
		console.log('Data/hora inválida. Use o formato: YYYY-MM-DD HH:mm');
	}
}

function printMainMenu(): void {
	console.log('\n=== Sistema de Agendamento de Salas (CLI) ===');
	console.log('1 - cadastrar usuario');
	console.log('2 - agendar sala');
	console.log('3 - Quit');
	console.log('4 - consultar reservas');
}

function printUserSubMenu(): void {
	console.log('\n-- Cadastro de Usuário --');
	console.log('1 - Cadastrar professor');
	console.log('2 - Cadastrar Aluno');
}

function printRoomSubMenu(): void {
	console.log('\n-- Agendamento de Sala --');
	console.log('1 - Agendar laboratorio');
	console.log('2 - Agendar sala individual');
	console.log('3 - Agendar sala em grupo');
}

function printAddonsMenu(): void {
	console.log('\n-- Adicionais da Sala (Decorator) --');
	console.log('Deseja acrescentar algo à sala?');
	console.log('1 - Sim');
	console.log('2 - Não');
}

function printAddonsChoices(): void {
	console.log('\nEscolha um adicional:');
	console.log('1 - Projetor');
	console.log('2 - Serviço de limpeza');
	console.log('3 - Área de café');
}

function mapRoomChoice(choice: string): RoomType {
	switch (choice) {
		case '1':
			return 'Lab';
		case '2':
			return 'Individual';
		case '3':
			return 'Group';
		default:
			// askChoice garante que isso não acontece
			return 'Individual';
	}
}

function ensureRoom(control: ControlOfReservation, type: RoomType) {
	const existing = control.rooms.find(r => r.type === type);
	if (existing) return existing;

	const room = RoomFactory.createRoom(type, false);
	control.rooms.push(room);

	// Novas salas devem notificar os usuários já cadastrados.
	control.users.forEach(u => room.subscribe(u));
	return room;
}

function getRoomAddons(room: unknown): string[] {
	const withAddons = room as unknown as { getAddons?: () => string[] };
	if (typeof withAddons.getAddons === 'function') {
		const addons = withAddons.getAddons();
		return addons.map((a) => {
			switch (a) {
				case 'Projector':
					return 'Projetor';
				case 'CleaningService':
					return 'Serviço de limpeza';
				case 'CoffeeArea':
					return 'Área de café';
				default:
					return a;
			}
		});
	}

	// Fallback (caso a sala não seja decorada)
	const anyRoom = room as any;
	const labels: string[] = [];
	if (anyRoom?.projector) labels.push('Projetor');
	if (anyRoom?.cleaning) labels.push('Serviço de limpeza');
	if (anyRoom?.coffee) labels.push('Área de café');
	return labels;
}

function printRoomAddons(room: unknown): void {
	const addons = getRoomAddons(room);
	console.log(`Equipamentos adicionais: ${addons.length > 0 ? addons.join(', ') : 'Nenhum'}`);
}

async function maybeDecorateRoom(
	rl: ReturnType<typeof createInterface>,
	control: ControlOfReservation,
	roomId: number,
): Promise<void> {
	const roomIndex = control.rooms.findIndex(r => r.id === roomId);
	if (roomIndex < 0) return;

	const baseRoom = control.rooms[roomIndex]!;

	printAddonsMenu();
	const wantAddons = await askChoice(rl, 'Opção (1-2): ', ['1', '2']);
	if (wantAddons === '2') {
		printRoomAddons(baseRoom);
		return;
	}

	printAddonsChoices();
	const addonChoice = await askChoice(rl, 'Opção (1-3): ', ['1', '2', '3']);

	let decorated = baseRoom;
	if (addonChoice === '1') decorated = new ProjectorRoom(decorated);
	if (addonChoice === '2') decorated = new CleaningServiceRoom(decorated);
	if (addonChoice === '3') decorated = new CoffeeAreaRoom(decorated);

	control.rooms[roomIndex] = decorated;
	console.log('Adicional aplicado com sucesso.');
	printRoomAddons(decorated);
}

async function handleRegisterUser(rl: ReturnType<typeof createInterface>, control: ControlOfReservation) {
	printUserSubMenu();
	const subChoice = await askChoice(rl, 'Escolha uma opção (1-2): ', ['1', '2']);

	const name = await askNonEmpty(rl, 'Nome: ');
	const email = await askNonEmpty(rl, 'Email: ');
	const password = await askNonEmpty(rl, 'Senha: ');

	const user = subChoice === '1'
		? new Professor(name, email, password)
		: new Student(name, email, password);

	control.users.push(user);
	control.rooms.forEach(room => room.subscribe(user));

	console.log(`Usuário cadastrado com sucesso! ID=${user.id} | Nome=${user.name} | Perfil=${user.role}`);
}

async function handleScheduleRoom(rl: ReturnType<typeof createInterface>, control: ControlOfReservation) {
	if (control.users.length === 0) {
		console.log('Nenhum usuário cadastrado. Cadastre um usuário primeiro.');
		return;
	}

	printRoomSubMenu();
	const subChoice = await askChoice(rl, 'Escolha uma opção (1-3): ', ['1', '2', '3']);
	const roomType = mapRoomChoice(subChoice);
	const room = ensureRoom(control, roomType);

	console.log(`Sala selecionada: ID= ${room.id} | Tipo= ${room.type}`);
	await maybeDecorateRoom(rl, control, room.id);

	console.log('\nUsuários cadastrados:');
	control.users.forEach(u => console.log(`- ID=${u.id} | ${u.name} (${u.role})`));

	const userId = await askNumber(rl, 'Informe o ID do usuário: ');

	const suggested = buildSuggestedSlots();
	console.log('\nHorários sugeridos (escolha 1-3):');
	suggested.forEach((slot, idx) => {
		console.log(`${idx + 1} - ${formatLocalDateTime(slot.start)} até ${formatLocalDateTime(slot.end)}`);
	});
	console.log('4 - Inserir manualmente');

	const timeChoice = await askChoice(rl, 'Opção (1-4): ', ['1', '2', '3', '4']);

	const startTime = timeChoice === '4'
		? await askDateTime(rl, 'Início (YYYY-MM-DD HH:mm): ')
		: suggested[Number(timeChoice) - 1]!.start;
	const endTime = timeChoice === '4'
		? await askDateTime(rl, 'Fim (YYYY-MM-DD HH:mm): ')
		: suggested[Number(timeChoice) - 1]!.end;

	const reservation = control.reserve(userId, room.id, startTime, endTime);
	if (reservation) {
		printRoomAddons(reservation.room);
	}
}

function handleConsultReservations(control: ControlOfReservation): void {
	console.log('\n-- Reservas Existentes --');
	if (control.reservations.length === 0) {
		console.log('Nenhuma reserva encontrada.');
		return;
	}

	control.reservations.forEach((reservation) => {
		const userName = reservation.user?.name ?? 'Desconhecido';
		const userRole = reservation.user?.role ?? 'N/A';
		const roomType = reservation.room?.type ?? 'N/A';
		const roomId = reservation.room?.id ?? reservation.roomId;
		const addons = getRoomAddons(reservation.room);
		const addonsText = addons.length > 0 ? addons.join(', ') : 'Nenhum';

		console.log(
			`Reserva ID=${reservation.id}: ${userName} (${userRole}) reservou Sala ${roomId} (${roomType}) | ` +
			`${formatLocalDateTime(reservation.startTime)} até ${formatLocalDateTime(reservation.endTime)} | ` +
			`Adicionais: ${addonsText}`,
		);
	});
}

export async function main(): Promise<void> {
	const rl = createInterface({ input, output });
	const control = new ControlOfReservation();

	// Mantém pelo menos 1 sala de cada tipo disponível para agendamento.
	(['Lab', 'Individual', 'Group'] as const).forEach((type) => {
		const room = RoomFactory.createRoom(type, false);
		control.rooms.push(room);
	});

	try {
		while (true) {
			printMainMenu();
			const choice = await askChoice(rl, 'Escolha uma opção (1-4): ', ['1', '2', '3', '4'] as const);

			if (choice === '3') {
				console.log('Encerrando...');
				break;
			}

			if (choice === '1') {
				await handleRegisterUser(rl, control);
				continue;
			}

			if (choice === '2') {
				await handleScheduleRoom(rl, control);
				continue;
			}

			if (choice === '4') {
				handleConsultReservations(control);
				continue;
			}
		}
	} finally {
		rl.close();
	}
}

// Executa quando chamado diretamente via node.
await main();

