import { distanceVector } from "../helpers/array";

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

export function part1(input: string) {
	const lines = testInput.split("\n").map((line) => line.split(""));

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

	for (const [char, positions] of frequencyPositions) {
		const calculateNodes = (
			currentPosition: [number, number],
			rest: [number, number][],
			antinodes: Set<string> = new Set()
		) => {
			if (rest.length === 0) {
				return antinodes;
			}

			const [nextPosition, ...nextRest] = rest;
			const pointDistance = distanceVector(currentPosition, nextPosition);
			antinodes.add(
				[
					nextPosition[0] - pointDistance[0],
					nextPosition[1] - pointDistance[1],
				].join(",")
			);
			antinodes.add(
				[
					nextPosition[0] + pointDistance[0],
					nextPosition[1] + pointDistance[1],
				].join(",")
			);
			return calculateNodes(nextPosition, nextRest, antinodes);
		};

		const nodes = calculateNodes(positions[0], positions.slice(1));
		console.log(nodes);
	}
}

export function part2(input: string) {}
