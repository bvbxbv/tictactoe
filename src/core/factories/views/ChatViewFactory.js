import { ViewFactory } from "@factories/Factory";
import { ChatView } from "@views/ChatView";

export class ChatViewFactory extends ViewFactory {
	create(chatDOM) {
		return new ChatView(chatDOM);
	}
}
