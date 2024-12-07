import { equal, window } from "../helpers/array";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function safe(report: number[]) {
	return (
		window(report, 2).every(
			([a, b]) => Math.abs(a - b) <= 3 && Math.abs(a - b) >= 1
		) &&
		(equal(
			report,
			[...report].sort((a, b) => a - b)
		) ||
			equal(
				report,
				[...report].sort((a, b) => b - a)
			))
	);
}

export function part1(input: string) {
	const reports = input.split("\n").map((line) => line.split(" ").map(Number));
	return reports.filter((report) => safe(report)).length;
}

export function part2(input: string) {
	const reports = input.split("\n").map((line) => line.split(" ").map(Number));

	return reports.filter((report) => {
		return (
			safe(report) ||
			report.entries().some(([i, a]) => {
				return safe(report.slice(0, i).concat(report.slice(i + 1)));
			})
		);
	}).length;
}
