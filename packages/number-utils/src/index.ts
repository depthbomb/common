/**
 * Returns a number nearest to the input number from an array of numbers
 * @param input Input number
 * @param numbers Array of numbers
 * @returns The number from `numbers` that is closest to `input`
 */
export function closestNumber(input: number, numbers: number[]): number {
	return numbers.reduce((prev, curr) => (Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev));
};

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
