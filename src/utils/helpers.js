import { log } from "@utils/consolawrapper";

export function logAction(context, event, payload = null) {
	const contextName = context?.constructor?.name ?? context?.name ?? "UnknownContext";
	log.start(`[Event] ${event.name} emitted by ${contextName}`, format(null, payload));
}

export function logHandler(context, event, handler, payload = null) {
	const contextName = context?.constructor?.name ?? context?.name ?? "UnknownContext";
	log.info(
		`[Event] ${event.name} handled by ${contextName}.${handler?.name}`,
		format(contextName, payload),
	);
}

function format(context, payload) {
	const data = {};
	if (context?.name) data.context = context.name;
	if (payload !== undefined) data.payload = payload;
	return data;
}

export const ok = (v) => ({ ok: true, value: v });
export const err = (code, message) => ({ ok: false, value: null, error: { code, message } });

export function getRandomItem(of, needIndex = false) {
	if (!Array.isArray(of)) {
		// exception
		throw new Error(`${of} это не массив`);
	}

	const index = Math.floor(Math.random() * of.length);
	if (needIndex) {
		return index;
	}

	return of[index];
}

export function random(min, max) {
	const rand = Math.floor(Math.random() * (max - min + 1)) + min;
	return rand;
}

export function gotLucky(chance) {
	if (chance > 1) {
		// 30 -> 0.3
		chance = chance / 100;
	}
	return Math.random() <= chance;
}

export function createChatMessage(nickname, message, classNames = {}) {
	const { wrap = "", nick = "", msg = "" } = classNames;

	const wrapper = document.createElement("div");
	wrapper.className = `chat-message p-5 pb-2 ${wrap}`.trim();

	const nickEl = document.createElement("div");
	nickEl.className = `__nickname text-purple-500 font-bold tracking-tighter ${nick}`.trim();
	nickEl.textContent = nickname;

	const msgEl = document.createElement("div");
	msgEl.className = `__message tracking-wide font-[roboto] ${msg}`.trim();
	msgEl.textContent = message;

	wrapper.append(nickEl, msgEl);

	return wrapper;
}
