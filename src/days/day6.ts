const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const directions = [
	[0, -1],
	[1, 0],
	[0, 1],
	[-1, 0],
];

function getGrid(input: string): string[][] {
	return input.split("\n").map((line) => line.split(""));
}

function getStartingPosition(grid: string[][]): [number, number] {
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === "^") {
				return [x, y];
			}
		}
	}
	return [-1, -1];
}

export function part1(input: string) {
	const grid = getGrid(input);
	const [startX, startY] = getStartingPosition(grid);
	const visitedPoints = new Set<string>();

	let direction = [0, -1];
	let steps = 0;
	let x = startX;
	let y = startY - 1;
	while (x < grid[0].length && y < grid.length && x >= 0 && y >= 0) {
		const [dx, dy] = direction;
		const nextX = x + dx;
		const nextY = y + dy;

		if (!grid[nextY] || !grid[nextY][nextX]) {
			break;
		}

		if (grid[nextY][nextX] === "#") {
			direction = directions[(directions.indexOf(direction) + 1) % 4];
		} else {
			steps++;
			x = nextX;
			y = nextY;
			visitedPoints.add(`${x},${y}`);
		}
	}

	return visitedPoints.size + 1;
}

export function part2() {}
