/**
 * Returns a number nearest to the input number from an array of numbers.
 * @param input Input number
 * @param numbers Array of numbers
 */
export function closestNumber(input: number, numbers: number[]): number {
	return numbers.reduce((prev, curr) => (Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev));
};

/**
 * Creates an iterable number range.
 * @param start The number the range should start at
 * @param end The number the range should stop at
 * @param step The distance between each number in the range
 */
export function range(start: number, end: number, step: number = 1): IterableIterator<number> {
	return {
		[Symbol.iterator]() {
			return this;
		},
		next() {
			if (start < end) {
				start = start + step;
				return { value: start, done: false };
			}

			return { done: true, value: end };
		}
	};
};
