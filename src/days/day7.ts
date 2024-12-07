const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

function parseInput(input: string) {
	return input.split("\n").map((line) => {
		const [total, numbers] = line.split(": ");
		return {
			total: parseInt(total),
			numbers: numbers.split(" ").map((n) => parseInt(n)),
		};
	});
}

export function part1(input: string) {
	const data = parseInput(input);

	const matches = data.filter(({ total, numbers }) => {
		const operation = (
			currentTotal: number,
			numbersToCheck: number[]
		): boolean => {
			if (currentTotal > total) {
				return false;
			}

			if (numbersToCheck.length === 0) {
				return currentTotal === total;
			}

			const [number, ...rest] = numbersToCheck;

			return (
				operation(currentTotal + number, rest) ||
				operation(currentTotal * number, rest)
			);
		};

		return operation(0, numbers);
	});

	return matches.reduce((acc, { total }) => acc + total, 0);
}

export function part2(input: string) {
	const data = parseInput(input);

	const matches = data.filter(({ total, numbers }) => {
		const operation = (
			currentTotal: number,
			numbersToCheck: number[]
		): boolean => {
			if (currentTotal > total) {
				return false;
			}

			if (numbersToCheck.length === 0) {
				return currentTotal === total;
			}

			const [number, ...rest] = numbersToCheck;

			return (
				operation(currentTotal + number, rest) ||
				operation(currentTotal * number, rest) ||
				operation(Number(`${currentTotal}${number}`), rest)
			);
		};

		const [first, ...rest] = numbers;
		return operation(first, rest);
	});

	return matches.reduce((acc, { total }) => acc + total, 0);
}
