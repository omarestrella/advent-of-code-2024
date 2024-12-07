import { getDiagonal, equal } from "../helpers/array";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const testInput2 = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`;

export function part1(input: string) {
	const data = input.split("\n").map((line) => line.split(""));
	const words: string[] = [];

	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	] as const;

	data.forEach((row, y) => {
		row.forEach((letter, x) => {
			directions.forEach((direction) => {
				const word = [letter, ...getDiagonal(data, [x, y], direction, 3)].join(
					""
				);
				if (word.length === 4) {
					words.push(word);
				}
			});
		});
	});

	return words.filter((word) => word === "XMAS").length;
}

export function part2(input: string) {
	const data = input.split("\n").map((line) => line.split(""));
	let count = 0;

	const directions = [
		[-1, -1],
		[1, 1],
		[1, -1],
		[-1, 1],
	] as const;

	data.forEach((row, y) => {
		row.forEach((letter, x) => {
			if (letter !== "A") {
				return;
			}

			const nwLetter = getDiagonal(data, [x, y], directions[0], 1)[0];
			const seLetter = getDiagonal(data, [x, y], directions[1], 1)[0];
			const neLetter = getDiagonal(data, [x, y], directions[2], 1)[0];
			const swLetter = getDiagonal(data, [x, y], directions[3], 1)[0];

			const firstWord = [nwLetter, letter, seLetter].sort().join("");
			const secondWord = [neLetter, letter, swLetter].sort().join("");

			if (firstWord === "AMS" && secondWord === "AMS") {
				count++;
			}
		});
	});

	return count;
}
