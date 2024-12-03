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

export function same<T>(a: T[], b: T[]): boolean {
	return a.length === b.length && a.every((x, i) => x === b[i]);
}
