import { getMiddle } from "../helpers/array";
import { difference, intersection } from "../helpers/set";

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

function getOrderingRules(input: string) {
	const beforeMap = new Map<number, Set<number>>();
	const afterMap = new Map<number, Set<number>>();

	const orderingInput = input.split("\n\n")[0];
	orderingInput.split("\n").forEach((line) => {
		const [from, to] = line.split("|").map(Number);
		if (!afterMap.has(from)) {
			afterMap.set(from, new Set());
		}
		if (!beforeMap.has(to)) {
			beforeMap.set(to, new Set());
		}

		afterMap.get(from)!.add(to);
		beforeMap.get(to)!.add(from);
	});

	return { before: beforeMap, after: afterMap };
}

function getPages(input: string) {
	const pages = input
		.split("\n\n")[1]
		.split("\n")
		.map((line) => line.split(",").map(Number));
	return pages;
}

function arePagesCorrect(
	pages: number[],
	orderingRules: ReturnType<typeof getOrderingRules>
) {
	return pages.every((page, index) => {
		const beforeSet = orderingRules.before.get(page);
		const afterSet = orderingRules.after.get(page);

		if (!afterSet) return true;

		const pagesAfter = new Set(pages.slice(index + 1) ?? []);
		const pagesBefore = new Set(pages.slice(0, index) ?? []);

		const isBeforeOthers =
			intersection(afterSet, pagesAfter).size === pagesAfter.size;
		if (!isBeforeOthers) return false;

		if (!beforeSet) return true;

		return intersection(beforeSet, pagesBefore).size === pagesBefore.size;
	});
}

export function part1(input: string) {
	const orderingRules = getOrderingRules(input);
	const list = getPages(input);

	const printedPageList = list.filter((pages) => {
		return arePagesCorrect(pages, orderingRules);
	});

	return printedPageList.reduce((acc, pages) => acc + getMiddle(pages), 0);
}

export function part2(input: string) {
	const orderingRules = getOrderingRules(input);
	const list = getPages(input);

	const invalidPageList = list.filter((pages) => {
		return !arePagesCorrect(pages, orderingRules);
	});

	const validPageList: number[][] = [];

	invalidPageList.forEach((pages) => {
		const orderedPages: number[] = [];

		let counter = 0;

		const remainingPages = new Set(pages);
		while (orderedPages.length < pages.length) {
			if (remainingPages.size === 1) {
				orderedPages.push(remainingPages.values().next().value!);
				break;
			}

			const nextPage = Array.from(remainingPages).find((page) => {
				const pageSet = new Set(remainingPages);
				pageSet.delete(page);

				const after = orderingRules.after.get(page);
				if (!after) return false;
				return intersection(after, pageSet).size === pageSet.size;
			});

			if (nextPage) {
				orderedPages.push(nextPage);
				remainingPages.delete(nextPage);
			}
			counter += 1;
			if (counter > 10) break;
		}

		validPageList.push(orderedPages);
	});

	// 4921 - too low

	return validPageList.reduce((acc, pages) => acc + getMiddle(pages), 0);
}
