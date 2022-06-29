import { uid }                                     from 'uid';
import { join }                                    from 'pathe';
import convert                                     from 'convert';
import { tmpdir }                                  from 'node:os';
import { mkdirSync, existsSync }                   from 'node:fs';
import { stat, mkdir, access, readdir, writeFile } from 'node:fs/promises';

/**
 * Checks if a file or directory exists.
 * @param path Path to a file or directory
 * @returns `true` if the {@link path} exists, `false` otherwise
 */
export async function exists(path: string): Promise<boolean> {
	try {
		await access(path);
		return true;
	} catch (_) {
		return false;
	}
};

/**
 * Creates a temporary file in the OS's temp directory
 * @param extension Extension to use for the temporary file
 * @param dry Whether to only return the path to the file
 * @returns Path to the temporary file
 */
export async function createTempFile(extension: string = 'tmp', dry: boolean = false): Promise<string> {
	const tempFile = join(tmpdir(), `${uid()}.${extension}`);

	if (!dry) {
		await writeFile(tempFile, '');
	}

	return tempFile;
};

/**
 * Recursively iterates through a directory
 * @param path Path to walk
 */
export async function *walkDir(path: string): AsyncGenerator<string> {
	const files = await readdir(path, { withFileTypes: true });
	for (const file of files) {
		const filepath = join(path, file.name);
		const stats = await stat(filepath);
		if (stats.isDirectory()) {
			yield* await walkDir(filepath);
		} else {
			yield filepath;
		}
	}
};

/**
 * Asynchronously creates the provided directories recursively if they don't exist
 * @param paths Paths
 */
export async function createDirectories(...paths: string[]): Promise<void> {
	for (const path of paths) {
		if (!await exists(path)) {
			await mkdir(path, { recursive: true });
		}
	}
};

/**
 * Synchronously creates theprovided directories if recursively if they don't exist
 * @param paths Paths
 */
export function createDirectoriesSync(...paths: string[]): void {
	for (const path of paths) {
		if (!existsSync(path)) {
			mkdirSync(path, { recursive: true });
		}
	}
};

/**
 * Gets the size of a file.
 * @param path The path to the file
 * @param returnFormatted Whether to return a human-readable format
 * @returns The number of bytes representing the file size or a string if {@link returnFormatted} is set to `true`.
 */
export async function getFileSize(path: string, returnFormatted: boolean = false): Promise<number | string> {
	if (await exists(path)) {
		const { size } = await stat(path);

		if (returnFormatted) {
			return String(convert(size, 'bytes').to('best'));
		}

		return size;
	}

	throw new Error(`File ${path} does not exist`);
};
