import { readDay } from "./helpers/files";

async function main() {
	const day = prompt("Which day do you want to run?");
	const module = await import(`./days/day${day}.ts`);
	const input = await readDay(Number(day));

	const part1Start = performance.now();
	const part1 = await module.part1(input);
	const part1End = performance.now();

	console.log("Part 1:", part1);

	const part2Start = performance.now();
	const part2 = await module.part2(input);
	const part2End = performance.now();
	console.log("Part 2:", part2);

	console.log("Part 1 took", part1End - part1Start, "ms");
	console.log("Part 2 took", part2End - part2Start, "ms");
}

main();
