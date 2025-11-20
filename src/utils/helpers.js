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
