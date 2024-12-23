import { combinations, distanceVector, equal } from "../helpers/array";

const testInput = `..........
..........
..........
....a.....
..........
.....a....
..........
..........
..........
..........`;

const testInput2 = `..........
..........
..........
....a.....
........a.
.....a....
..........
..........
..........
..........`;

const testInput3 = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const testInput4 = `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`;

function inBounds(x: number, y: number, lines: string[][]) {
	return x >= 0 && y >= 0 && x < lines[0].length && y < lines.length;
}

export function part1(input: string) {
	const lines = input.split("\n").map((line) => line.split(""));

	const frequencyPositions = new Map<string, [number, number][]>();

	lines.forEach((line, y) => {
		line.forEach((char, x) => {
			if (char !== ".") {
				const positions = frequencyPositions.get(char) || [];
				positions.push([x, y]);
				frequencyPositions.set(char, positions);
			}
		});
	});

	const antinodes = new Set<string>();

	for (const [char, positions] of frequencyPositions) {
		const combs = combinations(positions, 2) as [number, number][][];

		const calculateNode = (
			first: [number, number],
			second: [number, number]
		) => {
			const [dx, dy] = distanceVector(first, second);

			const points = [
				[first[0] - dx, first[1] - dy],
				[second[0] + dx, second[1] + dy],
			];

			for (const point of points) {
				if (
					!equal(point, first) &&
					!equal(point, second) &&
					lines[point[1]]?.[point[0]] !== char &&
					inBounds(point[0], point[1], lines)
				) {
					antinodes.add(`${point[0]},${point[1]}`);
				}
			}
		};

		combs.forEach(([first, second]) => {
			if (!second) {
				return;
			}
			calculateNode(first, second);
		});
	}

	const antinodePoints = Array.from(antinodes)
		.map((point) => point.split(",").map((n) => Number.parseInt(n)))
		.filter(
			([x, y]) => x >= 0 && y >= 0 && x < lines[0].length && y < lines.length
		);

	return antinodePoints.length;
}

export function part2(input: string) {
	const lines = input.split("\n").map((line) => line.split(""));

	const frequencyPositions = new Map<string, [number, number][]>();

	lines.forEach((line, y) => {
		line.forEach((char, x) => {
			if (char !== ".") {
				const positions = frequencyPositions.get(char) || [];
				positions.push([x, y]);
				frequencyPositions.set(char, positions);
			}
		});
	});

	const antinodes = new Set<string>();

	for (const [char, positions] of frequencyPositions) {
		const combs = combinations(positions, 2) as [number, number][][];

		const addAntinode = (
			[x, y]: [number, number],
			[dx, dy]: [number, number]
		) => {
			if (inBounds(x, y, lines)) {
				antinodes.add(`${x},${y}`);
				addAntinode([x + dx, y + dy], [dx, dy]);
			}
		};

		combs.forEach(([first, second]) => {
			if (!second) {
				return;
			}
			const [dx, dy] = distanceVector(first, second);

			addAntinode(first, [dx, dy]);
			addAntinode(second, [-dx, -dy]);
		});
	}

	const antinodePoints = Array.from(antinodes)
		.map((point) => point.split(",").map((n) => Number.parseInt(n)))
		.filter(
			([x, y]) => x >= 0 && y >= 0 && x < lines[0].length && y < lines.length
		);

	// antinodePoints.forEach(([x, y]) => {
	// 	lines[y][x] = "#";
	// });
	// console.log(lines.map((line) => line.join("")).join("\n"));

	return antinodePoints.length;
}
