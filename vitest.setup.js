/// <reference types="vitest" />
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { afterEach } from "vitest";
import { beforeEach } from "./node_modules/vitest/dist/index";
import { getDomFixture } from "./tests/domFixture";

beforeEach(() => {
	document.body.innerHTML = getDomFixture();
});

afterEach(() => {
	document.body.innerHTML = "";
});
