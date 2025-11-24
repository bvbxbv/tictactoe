import "./index.css";
import { AppOrchestrator } from "@core/AppOrchestrator";
import { createIcons, icons } from "lucide";
import {
	RefreshCcw,
	Volume2,
	VolumeX,
	Volume1,
	Brain,
	List,
	Sun,
	Moon,
	Settings,
	Flag,
	Menu,
} from "lucide";

createIcons({
	icons: {
		RefreshCcw,
		Volume2,
		VolumeX,
		Volume1,
		Brain,
		List,
		Sun,
		Moon,
		Settings,
		Flag,
		Menu,
	},
});

new AppOrchestrator().run();
