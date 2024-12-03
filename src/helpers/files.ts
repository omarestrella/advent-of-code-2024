import { resolve } from "node:path";

export function readDay(day: number): Promise<string> {
	const nonUrlPath = new URL(import.meta.url).pathname;
	const path = resolve(nonUrlPath, "../..", "inputs", `day${day}.txt`);
	return Bun.file(path).text();
}
