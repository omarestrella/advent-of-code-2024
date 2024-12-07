export function intersection<T>(a: Set<T>, b: Set<T>) {
	return new Set([...a].filter((x) => b.has(x)));
}

export function difference<T>(a: Set<T>, b: Set<T>) {
	return new Set([...a].filter((x) => !b.has(x)));
}

export function same<T>(a: Set<T>, b: Set<T>) {
	return a.size === b.size && [...a].every((x) => b.has(x));
}
