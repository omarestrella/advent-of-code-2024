import { zip } from "../helpers/array";
import { readDay } from "../helpers/files";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

export async function part1() {
	const input = await readDay(1);
	const parsedInput = input
		.split("\n")
		.map((line) => line.match(/\d+/g)!.map(Number));

	const sortedFirst = parsedInput.map((nums) => nums[0]).sort((a, b) => a - b);
	const sortedSecond = parsedInput.map((nums) => nums[1]).sort((a, b) => a - b);

	return zip(sortedFirst, sortedSecond)
		.map(([a, b]) => {
			return Math.abs(a - b);
		})
		.reduce((sum, num) => sum + num, 0);
}

export async function part2() {
	const input = await readDay(1);
	const numbers: number[] = [];
	const counts = new Map<number, number>();

	input
		.split("\n")
		.map((line) => line.match(/\d+/g)!.map(Number))
		.forEach(([num, toCount]) => {
			numbers.push(num);
			counts.set(toCount, (counts.get(toCount) ?? 0) + 1);
		});

	return numbers.reduce((sum, num) => num * (counts.get(num) ?? 0) + sum, 0);
}
