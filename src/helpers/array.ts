export function zip<A, B>(a: A[], b: B[]): [A, B][] {
	const zipped = [];
	for (let i = 0; i < Math.min(a.length, b.length); i++) {
		zipped.push([a[i], b[i]]);
	}
	return zipped as [A, B][];
}

export function window<T>(arr: T[], size: number): T[][] {
	const windows = [];
	for (let i = 0; i < arr.length - size + 1; i++) {
		windows.push(arr.slice(i, i + size));
	}
	return windows;
}

export function combinations<T>(arr: T[], size: number): T[][] {
	if (size === 0) {
		return [[]];
	}

	if (arr.length === 0) {
		return [];
	}

	const [first, ...rest] = arr;
	const withFirst = combinations(rest, size - 1).map((x) => [first, ...x]);
	const withoutFirst = combinations(rest, size);
	return [...withFirst, ...withoutFirst];
}

export function equal<T>(a: T[], b: T[]): boolean {
	return a.length === b.length && a.every((x, i) => x === b[i]);
}

export function getDiagonal<T>(
	grid: T[][],
	point: [number, number],
	direction: readonly [number, number],
	count?: number
): T[] {
	const [dx, dy] = direction;
	let [x, y] = point;
	const neighbors = [];
	const max = count ? count : Math.max(grid.length, grid[0].length);
	for (let i = 0; i < max; i++) {
		x += dx;
		y += dy;
		if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
			break;
		}

		neighbors.push(grid[y][x]);
	}
	return neighbors;
}

export function getMiddle<T>(arr: T[]): T {
	return arr[Math.floor(arr.length / 2)];
}

export function distanceVector(
	a: [number, number],
	b: [number, number]
): [number, number] {
	return [b[0] - a[0], b[1] - a[1]];
}
