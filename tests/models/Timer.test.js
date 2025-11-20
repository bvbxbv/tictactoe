import { Timer } from "@models/Timer";
import { beforeEach, test } from "../../node_modules/vitest/dist/index";
import { expect } from "../../node_modules/vitest/dist/index";

let timer;
beforeEach(() => {
	timer = new Timer();
});

test("timer -> setTime/time", () => {
	expect(timer.time).toBe(5000);
	timer.setTime(2280);
	expect(timer.time).toBe(2280);
});

test("timer -> reset", () => {
	expect(timer.time).toBe(5000);
	timer.setTime(2280);
	timer.reset(5000);
	expect(timer.time).toBe(5000);
});
