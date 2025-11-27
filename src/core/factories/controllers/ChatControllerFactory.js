import { ChatController } from "@controllers/ChatController";
import { ControllerFactory } from "../Factory";

export class ChatControllerFactory extends ControllerFactory {
	create(view) {
		return new ChatController(this.gameManager, this.dispatcher, view, this.store);
	}
}
