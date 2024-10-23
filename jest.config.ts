// jest.config.js

/**
 * Jest configuration file.
 * Configures how Jest runs tests in the project.
 */

export const moduleFileExtensions = ['js', 'json', 'ts']; // File extensions Jest will process
export const rootDir = '.'; // Root directory for Jest to scan for tests and modules
export const testRegex = 'tests/.*\\.spec\\.ts$'; // Regex pattern to detect test files
export const collectCoverageFrom = ['**/*.(t|j)s']; // Specifies which files coverage information should be collected from
export const coverageDirectory = 'coverage'; // Directory where coverage reports are saved
export const testEnvironment = 'node'; // Specifies the test environment that will be used for testing
export const transform = { '^.+\\.ts$': 'ts-jest' }; // Transforms TypeScript files using ts-jest
