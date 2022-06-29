/**
 * Checks whether an object is empty
 * @param object Object
 */
export function isObjectEmpty(object: object): boolean {
	return !Object.keys(object).length;
};

/**
 * Checks if an object has a property.
 * @param obj The object to check in
 * @param prop The property to look for
 */
export function objectHasProperty(obj: object, prop: PropertyKey): boolean {
	return Reflect.has(obj, prop);
};

/**
 * Checks if an object has at least one provided property.
 * @param obj The object to check in
 * @param props Array of properties to test
 */
export function objectHasAtLeastOneProperty(obj: object, props: PropertyKey[]): boolean {
	for (const prop of props) {
		if (objectHasProperty(obj, prop)) {
			return true;
		}
	}

	return false;
};
