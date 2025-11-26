import "./index.css";
import { AppOrchestrator } from "@core/AppOrchestrator";
import { createIcons } from "lucide";
import { Volume2, VolumeX, Sun, Moon, Flag, Menu } from "lucide";

createIcons({
	icons: {
		Volume2,
		VolumeX,
		Sun,
		Moon,
		Flag,
		Menu,
	},
});

new AppOrchestrator().run();
