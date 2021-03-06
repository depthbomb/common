import { deflateSync, inflateSync } from 'node:zlib';
import camelCase                    from 'lodash/camelCase';
import upperFirst                   from 'lodash/upperFirst';

/**
 * Converts a string to PascalCase.
 * @param input The string to convert
 */
export function toPascalCase(input: string): string {
	return upperFirst(camelCase(input));
};

/**
 * Checks if a URL is valid
 * @param {string} url URL to check
 */
export function isValidURL(string: string): boolean {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
};

/**
 * Compresses a string using zlib.
 * @param input The string to compress
 * @param encoding The encoding to use
 */
export function compressString(input: string, encoding: BufferEncoding = 'base64'): string {
	return deflateSync(input).toString(encoding);
};

/**
 * Decompresses a string and returns its original value.
 * @param input The compressed string to decompress
 * @param encoding The encoding to use when decoding, __must be the same encoding used to encode the {@link input}!__
 */
export function decompressString(input: string, encoding: BufferEncoding = 'base64'): string {
	return inflateSync(Buffer.from(input, encoding)).toString();
};
