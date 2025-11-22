// FIXME: Factory

import { BoardUpdatedEvent } from "@core/events/BoardEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { Game } from "@models/Game";
import { getRandomItem, ok } from "@utils/helpers";

// FIXME: DIs
export class AIController {
	#gameManager;
	#dispatcher;

	constructor(gameManager, dispatcher) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(PlayerMovedEvent, this.handleMove.bind(this));
	}

	// FIXME: по-хорошему это должно быть не в контроллере, а в модели
	// FIXME: расширить логику. AI не всегда нолик, человек не всегда крестик.
	tryGetEndGameInfo(cells, combos) {
		const response = {
			ok: false,
			combo: [],
			indexes: [],
		};
		combos.forEach((combo) => {
			const [a, b, c] = combo;
			const items = [cells[a], cells[b], cells[c]];
			if (items.includes("X")) {
				return;
			}

			if (items.filter((i) => i === "").length === 1) {
				response.ok = true;
				response.combo.push(combo);
				response.indexes.push(combo[items.findIndex((cell) => cell === "")]);
			}
		});

		return response;
	}

	handleMove() {
		if (!this.#gameManager.isAiMove || this.#gameManager.isGameEnded) {
			return;
		}

		const info = this.tryGetEndGameInfo(this.#gameManager.board.cells, Game.combos);
		if (info.ok) {
			const winIndex = getRandomItem(info.indexes);
			this.#gameManager.makeMove(winIndex);
			return;
		}

		this.#gameManager.makeMove(getRandomItem(this.#gameManager.board.freeCells));
		this.#dispatcher.dispatch(new BoardUpdatedEvent(this.#gameManager.board.serialize()));
	}
}
