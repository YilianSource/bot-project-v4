import fs from "fs";
import path from "path";

/**
 * Walks through the specified directory and returns the default export
 * for each JS/TS file, casted to the desired generic type.
 *
 * @param dir The directory to walk over.
 * @returns An array of default returns.
 */
export function walkRequire<T>(dir: string): T[] {
    return fs
        .readdirSync(dir)
        .filter((file) => /^.+\.(js|ts)$/.test(file))
        .map((file) => {
            const filePath = path.join(dir, file);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            return require(filePath).default as T;
        });
}
