/// <reference types="vitest" />
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { afterEach } from "vitest";

afterEach(() => {
	document.body.innerHTML = "";
});
