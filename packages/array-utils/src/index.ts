/**
 * Empties arrays
 * @param arrays Arrays to empty
 */
export function emptyArrays(...arrays: any[][]): void {
	for (const array of arrays) {
		while (array.length > 0) {
			array.pop();
		}
	}
};
