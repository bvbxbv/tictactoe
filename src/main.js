import "./index.css";
import { AppOrchestrator } from "@core/AppOrchestrator";
import { createIcons } from "lucide";
import { Volume2, VolumeX, Sun, Moon, Flag, Menu, RefreshCcw, Settings } from "lucide";

createIcons({
	icons: {
		Settings,
		RefreshCcw,
		Volume2,
		VolumeX,
		Sun,
		Moon,
		Flag,
		Menu,
	},
});

new AppOrchestrator().run();
