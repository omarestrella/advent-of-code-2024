const testInput1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

function extractMultiplications(input: string): [number, number][] {
	const matches = input.matchAll(/mul\((\d+),(\d+)\)/g);
	const multiplications: [number, number][] = [];
	for (const match of matches) {
		multiplications.push([
			Number.parseInt(match[1]),
			Number.parseInt(match[2]),
		]);
	}
	return multiplications;
}

type Instruction =
	| { instruction: "do" }
	| { instruction: "don't" }
	| { instruction: "mul"; numbers: [number, number] };

function extractInstructions(input: string) {
	const regex =
		/(?<instruction>don't)\(\)|(?<instruction>do)\(\)|(?<instruction>mul)\((\d+),(\d+)\)/g;
	const matches = input.matchAll(regex);

	const instructions: Instruction[] = [];

	for (const match of matches) {
		if (!match.groups) {
			continue;
		}

		switch (match.groups.instruction) {
			case "don't":
				instructions.push({ instruction: "don't" });
				break;
			case "do":
				instructions.push({ instruction: "do" });
				break;
			case "mul":
				instructions.push({
					instruction: "mul",
					numbers: [Number.parseInt(match[4]), Number.parseInt(match[5])],
				});
				break;
		}
	}

	return instructions;
}

export function part1(input: string) {
	const multiplications = extractMultiplications(input);
	return multiplications.reduce((acc, [a, b]) => acc + a * b, 0);
}

export function part2(input: string) {
	const instructions = extractInstructions(input);
	let total = 0;
	let multiplying = true;
	for (const instruction of instructions) {
		switch (instruction.instruction) {
			case "do":
				multiplying = true;
				break;
			case "don't":
				multiplying = false;
				break;
			case "mul":
				if (multiplying) {
					total += instruction.numbers[0] * instruction.numbers[1];
				}
				break;
		}
	}

	return total;
}
